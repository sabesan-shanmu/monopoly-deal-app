import itertools
from monopoly.api.games.preMoveCheck.services import GroupedCards
import monopoly.common.enums as Enum


class InPlayMove():
    def __init__(self):
        self.selectablePlayers = []
        self.selectableCards = []
    def add_selectableCard(self,selectableCard):
        self.selectableCards.append(selectableCard)


def get_in_play_moves(currentPlayerMove,propertyPileCards):

    inPlayMovesList = InPlayMove()

    my_player_cards_grouped_by_groupId = []
    key_func = lambda x: x.groupId
    sortedPropertyCards = sorted(propertyPileCards, key=key_func, reverse=True)
    for key, group in itertools.groupby(sortedPropertyCards, key=key_func):
        cards = list(group)
        currentTotalInSet = len(cards)
        numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
        my_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))

    playedGameCard = currentPlayerMove.transactionTracker.gameCard

    for propertyPileCard in propertyPileCards:
        
        isNonCompleteSetCard = len([x for x in my_player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet and x.groupId == propertyPileCard.groupId]) > 0
        #forced deal card cannot be part of a complete set
        if currentPlayerMove.transactionTracker.actionType is Enum.ActionTypes.ForcedDeal and isNonCompleteSetCard == True:
            inPlayMovesList.add_selectableCard({"gameCardId":propertyPileCard.gameCardId,"actionType":Enum.ActionTypes.ForcedDeal,"description":"Select Card"})
        elif currentPlayerMove.transactionTracker.actionType in [Enum.ActionTypes.DoubleTheRent,Enum.ActionTypes.SinglePlayerRent,Enum.ActionTypes.MultiplePlayerRent]:
            #if the rent card is a wild card any property card can be used, if its non wildcard both the primary and secondary colour must be checked
            isColourMatch = playedGameCard.card.rent.primaryColourId == Enum.Colours.Any or \
                propertyPileCard.assignedColourId == playedGameCard.card.rent.primaryColourId or \
                propertyPileCard.assignedColourId == playedGameCard.card.rent.secondaryColourId
            if(isColourMatch):
                inPlayMovesList.add_selectableCard({"gameCardId":propertyPileCard.gameCardId,"actionType":currentPlayerMove.transactionTracker.actionType,"description":"Select Card"})

    
    return inPlayMovesList