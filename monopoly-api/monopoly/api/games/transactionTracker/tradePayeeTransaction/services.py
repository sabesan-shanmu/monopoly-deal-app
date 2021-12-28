from monopoly.models import TradePayeeTransaction
from monopoly import db
from sqlalchemy import exc,and_
import monopoly.common.enums as Enum
import functools
from monopoly.exceptions import FieldValidationException
from monopoly.api.games.gameCards.services import update_game_card,get_game_card_by_id,get_game_cards_on_property_pile
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.common.utils import get_colour_name
from monopoly.api.games.preMoveCheck.services import GroupedCards
import itertools
from monopoly.notifications.playerCards import publish_delete_player_cards_on_hand_event_to_room

def getGameCardId(item):
    return item.gameCardId

def get_trade_payee_transaction_trackers(transactionTrackerId):
    return db.session.query(TradePayeeTransaction).filter_by(transactionTrackerId=transactionTrackerId).all()

def get_trade_payee_transaction_tracker(tradePayeeTransactionId):
    return db.session.query(TradePayeeTransaction).filter_by(tradePayeeTransactionId=tradePayeeTransactionId).first()


def save_trade_payee_transactions(tradePayeeTransactions):
    try:
        db.session.add_all(tradePayeeTransactions)
        db.session.commit()
        return tradePayeeTransactions
    except:
        db.session.rollback()
        raise

def modify_transaction_tracker(tradePayeeTransaction):
    try:
        tradePayeeTransactionUpdate=get_trade_payee_transaction_tracker(tradePayeeTransaction["tradePayeeTransactionId"])
        tradePayeeTransactionUpdate.payeeTransactionStatus = tradePayeeTransaction["payeeTransactionStatus"]
        db.session.commit()
        return tradePayeeTransactionUpdate
    except:
        db.session.rollback()
        raise

def evaluate_trade_payment(updated_trade_payee_transactions,transaction_tracker,targetPlayer):
    
    #get just say no card from player's hand (if exists)
    justSayNoCard = next(iter([x for x in targetPlayer.onHandCards if x.card.cardType == Enum.CardTypes.Action and x.card.action.actionType == Enum.ActionTypes.JustSayNo]),None)
    cardsOnField = targetPlayer.propertyPileCards + targetPlayer.cashPileCards
    
    if justSayNoCard is not None:
        #check to if just say no was played
        JustSayFound = next(iter([x for x in updated_trade_payee_transactions["sendingGameCards"] if x["gameCardId"] == justSayNoCard.gameCardId]),None)
        if JustSayFound is not None and updated_trade_payee_transactions["payeeTransactionStatus"] is Enum.PayeeTransactionStatus.DeclinedTransaction:
            return True
        elif JustSayFound is None and updated_trade_payee_transactions["payeeTransactionStatus"] is Enum.PayeeTransactionStatus.DeclinedTransaction:
            raise FieldValidationException(message="Cannot Decline Transaction without Just Say No Card")

    listOfCardOnFieldGameCardIds = list(map(lambda x:x.gameCardId,cardsOnField))
    listOfSendingGameCardIds = list(map(lambda x:x.get("gameCardId"),updated_trade_payee_transactions["sendingGameCards"] ))

    #verify that list of cards provided by player belongs to player
    invalidCard = next(iter([x for x in updated_trade_payee_transactions["sendingGameCards"]  if x["gameCardId"] not in listOfCardOnFieldGameCardIds]),None)

    if invalidCard is not None:
        raise FieldValidationException(message="Invalid Card found")
        
    if transaction_tracker.actionType in [Enum.ActionTypes.DebtCollector,Enum.ActionTypes.ItsMyBirthday,Enum.ActionTypes.SinglePlayerRent,Enum.ActionTypes.MultiplePlayerRent,Enum.ActionTypes.DoubleTheRent]:
    
        
        #if player has no cards on field, then end payment
        if len(cardsOnField) == 0:
            return True
        #get total value from player's property and cash pile
        totalCostInPlay = functools.reduce(lambda a, b: a+b.card.price, cardsOnField,0)

        
        submittedPaymentGameCards = [x for x in cardsOnField if x.gameCardId in listOfSendingGameCardIds]
        submittedtotalCost = functools.reduce(lambda a, b: a+b.card.price, submittedPaymentGameCards,0)
        
        #player must pay with all his/her cards if the total is less than requested
        if totalCostInPlay <  transaction_tracker.requestedTotal:
            if submittedtotalCost != totalCostInPlay:
                raise FieldValidationException(message="Player must pay with all their cards.")
            return True
        else:
            if submittedtotalCost < transaction_tracker.requestedTotal:
                raise FieldValidationException(message="Player must pay the minimum requested amount")
            return True    

    elif transaction_tracker.actionType in [Enum.ActionTypes.DealBreaker]:
        #verify that player sent all the cards in the group

        sendingGroupCards = [x for x in updated_trade_payee_transactions["sendingGameCards"]   if x["groupId"] == transaction_tracker.requestedGroupId]
        cardsOnFieldGroupCards = [x for x in cardsOnField  if x.groupId == transaction_tracker.requestedGroupId]
        
        return True if len(sendingGroupCards) == len(cardsOnFieldGroupCards) else False

    elif transaction_tracker.actionType in [Enum.ActionTypes.SlyDeal,Enum.ActionTypes.ForcedDeal]:
        foundGameCard = next(iter([x for x in listOfSendingGameCardIds  if x == transaction_tracker.requestedGameCardId]),None)
        return True if foundGameCard is not None else False
    else:
        return False


def trade_updated_game_cards(updated_trade_payee_transactions,transaction_tracker,targetPlayer,performedByPlayer):

    if updated_trade_payee_transactions["payeeTransactionStatus"] is Enum.PayeeTransactionStatus.DeclinedTransaction:

        for i,updated_card in enumerate(updated_trade_payee_transactions["sendingGameCards"]):
            original_game_card = get_game_card_by_id(updated_card["gameCardId"])
            original_game_card.cardLocationStatus = Enum.GameCardLocationStatus.IsInPlay
            update_game_card(original_game_card)
        
        #publish event for player since card is no longer on hand
        updated_gameCards_result = GameCardSchema(many=True).dump([original_game_card])
        publish_delete_player_cards_on_hand_event_to_room(targetPlayer.gamePassCode,targetPlayer.playerId,updated_gameCards_result)

    else:
       
        for i,updated_card in enumerate(updated_trade_payee_transactions["sendingGameCards"]):
            original_game_card = get_game_card_by_id(updated_card["gameCardId"])
            initiator_property_cards = get_game_cards_on_property_pile(performedByPlayer.gamePassCode,performedByPlayer.playerId)
            
            original_game_card.playerId = performedByPlayer.playerId
    
            if updated_card["cardLocationStatus"] == Enum.GameCardLocationStatus.IsPlayedOnPropertyPile:
                #wild cards traded through deal breaker should keep the original group id
                if original_game_card.card.properties.primaryColourId is Enum.Colours.Any \
                    and transaction_tracker.actionType is not Enum.ActionTypes.DealBreaker:
                    original_game_card.groupId = "0"
                    original_game_card.assignedColourId = None
                else:
                    original_game_card.groupId = get_next_group_id(original_game_card,initiator_property_cards)
            
            update_game_card(original_game_card)

        if transaction_tracker.actionType is Enum.ActionTypes.ForcedDeal:
            receiver_property_cards = get_game_cards_on_property_pile(targetPlayer.gamePassCode,targetPlayer.playerId)
            
            original_game_card = get_game_card_by_id(updated_trade_payee_transactions["receivingGameCard"]["gameCardId"])
            original_game_card.playerId = targetPlayer.playerId
            if original_game_card.card.properties.primaryColourId is Enum.Colours.Any:
                original_game_card.groupId = "0"
                original_game_card.assignedColourId = None
            else:
                original_game_card.groupId = get_next_group_id(original_game_card,receiver_property_cards)
            
            update_game_card(original_game_card)


def get_next_group_id(gameCard,propertyPileCards):
    
    player_cards_grouped_by_groupId = get_cards_grouped_by_group_id(propertyPileCards)
    found_properties = [x for x in propertyPileCards if x.assignedColourId == gameCard.assignedColourId]

    if len(found_properties) == 0:
        groupId = '{0}-1'.format(get_colour_name(gameCard.assignedColourId.value))
    else:
        found_empty_set = [x for x in player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet and x.colourId == gameCard.assignedColourId]
        groupId = found_empty_set[0].groupId if  len(found_empty_set) > 0 else '{0}-{1}'.format(get_colour_name(gameCard.assignedColourId.value),(int(found_properties[0].groupId.split("-")[1])+1))

    return groupId


def get_cards_grouped_by_group_id(propertyPileCards):

    player_cards_grouped_by_groupId = []
    key_func = lambda x: x.groupId
    sortedPropertyCards = sorted(propertyPileCards, key=key_func, reverse=True)
    for key, group in itertools.groupby(sortedPropertyCards, key=key_func):
        cards = list(group)
        currentTotalInSet = len(cards)
        colourId = cards[0].assignedColourId
        numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
        player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet,colourId=colourId))
    
    return player_cards_grouped_by_groupId