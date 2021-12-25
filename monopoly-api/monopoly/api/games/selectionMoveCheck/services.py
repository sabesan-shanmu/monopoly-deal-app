import itertools
from monopoly.api.games.preMoveCheck.services import GroupedCards
import monopoly.common.enums as Enum


class SelectionMoveCheck():
    def __init__(self):
        self.selectablePlayers = []
        self.selectableCards = []
    def add_selectablePlayer(self,selectablePlayer):
        self.selectablePlayers.append(selectablePlayer)
    def add_selectableCard(self,selectableCard):
        self.selectableCards.append(selectableCard)


def get_selection_moves(currentPlayerMove,otherPlayers):

    selectionMoveCheck = SelectionMoveCheck()

    
    for player in otherPlayers:

        propertyPileCards = player.propertyPileCards
        cashPileCards = player.cashPileCards

        #player has no cards on field
        #player has no property cards for sly deal , force deal or deal breaker
        if (len(propertyPileCards) == 0 and len(cashPileCards) == 0 ) or \
           (len(propertyPileCards) == 0 and currentPlayerMove.transactionTracker.actionType \
               in [Enum.ActionTypes.SlyDeal,Enum.ActionTypes.ForcedDeal,Enum.ActionTypes.DealBreaker]):
            continue
        
        other_player_cards_grouped_by_groupId = []
        key_func = lambda x: x.groupId
        sortedPropertyCards = sorted(propertyPileCards, key=key_func, reverse=True)
        for key, group in itertools.groupby(sortedPropertyCards, key=key_func):
            cards = list(group)
            currentTotalInSet = len(cards)
            numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
            other_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
    
        playedGameCard = currentPlayerMove.transactionTracker.gameCard

        if currentPlayerMove.transactionTracker.actionType in [Enum.ActionTypes.DebtCollector,Enum.ActionTypes.SinglePlayerRent,Enum.ActionTypes.DoubleTheRent]:
            selectionMoveCheck.add_selectablePlayer({"playerId":player.playerId,"description":"Select {0}".format(player.playerName),"actionType":currentPlayerMove.transactionTracker.actionType})
        elif currentPlayerMove.transactionTracker.actionType in [Enum.ActionTypes.SlyDeal,Enum.ActionTypes.ForcedDeal,Enum.ActionTypes.DealBreaker]:
         
            for propertyPileCard in propertyPileCards:
                isNonCompleteSetCard = len([x for x in other_player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet and x == propertyPileCard.groupId]) > 0
                
                if currentPlayerMove.transactionTracker.actionType in [Enum.ActionTypes.SlyDeal,Enum.ActionTypes.ForcedDeal] and isNonCompleteSetCard == True:
                    #sly deal and forced deal card cannot be part of a complete set
                    selectionMoveCheck.add_selectableCard({"gameCardId":propertyPileCard.gameCardId,"description":"Select Card","actionType":currentPlayerMove.transactionTracker.actionType})
                elif currentPlayerMove.transactionTracker.actionType in [Enum.ActionTypes.SlyDeal,Enum.ActionTypes.ForcedDeal] and isNonCompleteSetCard == False:
                    #deal break card must be played with complete set
                    selectionMoveCheck.add_selectableCard({"gameCardId":propertyPileCard.gameCardId,"description":"Select Set","actionType":currentPlayerMove.transactionTracker.actionType})
       
    return selectionMoveCheck