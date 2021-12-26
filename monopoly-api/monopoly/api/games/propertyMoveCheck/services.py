import itertools
from monopoly.api.games.preMoveCheck.services import GroupedCards
import monopoly.common.enums as Enum
from monopoly.common.utils import get_colour_name


def get_property_moves(propertyPileCards):

    player_cards_grouped_by_groupId = []
    key_func = lambda x: x.groupId
    sortedPropertyCards = sorted(propertyPileCards, key=key_func, reverse=True)
    for key, group in itertools.groupby(sortedPropertyCards, key=key_func):
        cards = list(group)
        currentTotalInSet = len(cards)
        colourId = cards[0].assignedColourId
        numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
        player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet,colourId=colourId))


    
    property_moves = []
    for propertyCard in propertyPileCards:
    
        #check if card can rotate 
        if propertyCard.card.properties.isRotatable is True:
            flippedAssignedColourId = propertyCard.card.properties.secondaryColourId if propertyCard.assignedColourId == propertyCard.card.properties.primaryColourId  \
                else propertyCard.card.properties.primaryColourId

            found_properties = [x for x in propertyPileCards if x.assignedColourId == flippedAssignedColourId]
            
            if len(found_properties) == 0:
                groupId = '{0}-1'.format(get_colour_name(flippedAssignedColourId.value))
            else:
                found_empty_set = [x for x in player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet and x.colourId == flippedAssignedColourId]
                groupId = found_empty_set[0].groupId if  len(found_empty_set) > 0 else '{0}-{1}'.format(get_colour_name(flippedAssignedColourId.value),(int(found_properties[0].groupId.split("-")[1])+1))
            
            property_moves.append({"gameCardId":propertyCard.gameCardId,"description":"Rotate Card","assignedColourId":flippedAssignedColourId,"isCardRightSideUp":not propertyCard.isCardRightSideUp,"groupId":groupId})
        elif propertyCard.card.properties.primaryColourId is Enum.Colours.Any:
            found_empty_set_list = [x for x in player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet and x.groupId != propertyCard.groupId]
            for found_empty_set in found_empty_set_list:
                groupId = found_empty_set.groupId
                property_moves.append({"gameCardId":propertyCard.gameCardId,"description":"Move to {0}".format(get_colour_name(found_empty_set.colourId.value)),"assignedColourId":found_empty_set.colourId,"isCardRightSideUp":propertyCard.isCardRightSideUp,"groupId":groupId})
    return property_moves
