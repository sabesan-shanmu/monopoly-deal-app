import monopoly.common.enums as Enum
from monopoly.exceptions import FieldValidationException
import itertools

def get_pre_move_check_list(current_player_cards,game_cards_played_by_all_players,game_play_actions):
    pre_move_check_list = []
    
    #cards on hand and on property pile
    for player_card in current_player_cards:

        cardType = player_card.card.cardType
        actionType = get_action_type(player_card)
        possible_play_actions = [x for x in game_play_actions if x.actionType==actionType and x.cardType==cardType]
        
        preMoveCheck = PreMoveCheck(gameCardId=player_card.gameCardId)

        for possible_play_action in possible_play_actions:
            if possible_play_action.isPreCheckRequired is True and is_pre_check_condition_valid(player_card,game_cards_played_by_all_players,possible_play_action):
                preMoveCheck.add_precheck_card(possible_play_action)
            elif possible_play_action.isPreCheckRequired is False:
                preMoveCheck.add_precheck_card(possible_play_action)
        
        pre_move_check_list.append(preMoveCheck)
            
    return pre_move_check_list

def get_action_type(player_card):

    
    return {
        Enum.CardTypes.Properties: (None if player_card.cardLocationStatus is not Enum.GameCardLocationStatus.IsPlayedOnPropertyPile else(Enum.ActionTypes.MoveCard \
            if player_card.card.properties.primaryColourDetails.colourId is not Enum.Colours.Any  else Enum.ActionTypes.RotateCard)),
        Enum.CardTypes.Cash: None,
        Enum.CardTypes.Rent: None,
        Enum.CardTypes.Action: player_card.card.action.actionType if player_card.card.action is not None else None,
    }[player_card.card.cardType]


def get_game_cards_played_by_all_players(players,game_cards_in_play):

    game_cards_played_by_all_players = []

    for player in players:
        cashPileCards = [x for x in game_cards_in_play if x.cardLocationStatus==Enum.GameCardLocationStatus.IsPlayedOnCashPile and x.playerId==player.playerId]
        propertyPileCards = [x for x in game_cards_in_play if x.cardLocationStatus==Enum.GameCardLocationStatus.IsPlayedOnPropertyPile and x.playerId==player.playerId]
        inPlayCards = [x for x in game_cards_in_play if x.cardLocationStatus==Enum.GameCardLocationStatus.IsInPlay and x.playerId==player.playerId]
        gameCardsOnBoard = GameCardsOnBoard(player.playerId,cashPileCards,propertyPileCards,inPlayCards)    
        game_cards_played_by_all_players.append(gameCardsOnBoard)
       
    return game_cards_played_by_all_players


class GameCardsOnBoard:
    
    def __init__(self,playerId,cashPileCards,propertyPileCards,inPlayCards):
        self.playerId = playerId
        self.cashPileCards = cashPileCards
        self.propertyPileCards = propertyPileCards
        self.inPlayCards = inPlayCards

class GroupedCards:
    
    def __init__(self,groupId,currentTotalInSet,numberNeededToCompleteSet,colourId = None):
        self.groupId = groupId
        self.currentTotalInSet = currentTotalInSet
        self.numberNeededToCompleteSet = numberNeededToCompleteSet
        self.colourId = colourId if colourId is not None else None

class PreMoveCheck:

    def __init__(self,gameCardId):
        self.gameCardId = gameCardId
        self.possibleMoves = []

    def add_precheck_card(self,possiblePlayAction):
        self.possibleMoves.append(possiblePlayAction)


def is_property_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    if(player_card.card.properties.primaryColourId is not Enum.Colours.Any):
        return True
    elif (player_card.card.properties.primaryColourId is Enum.Colours.Any):
        #check to see if player has played at least 1 property card in property pile with no full sets
        current_player_cards_on_field = next(iter([x for x in game_cards_played_by_all_players if x.playerId==player_card.playerId]),None)
        if(current_player_cards_on_field):
            current_player_cards_grouped_by_groupId = []
            key_func = lambda x: x.groupId
            for key, group in itertools.groupby(current_player_cards_on_field.propertyPileCards, key_func):
                cards = list(group)
                currentTotalInSet = len(cards)
                numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
                current_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
            
            #find a non complete set, if there's one then, wildcard property can be played
            if len([x for x in current_player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet]) == 0:
                return False   


    return False
        
def is_rent_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    current_player_cards_on_field = next(iter([x for x in game_cards_played_by_all_players if x.playerId==player_card.playerId]),None)
    if(current_player_cards_on_field):

        #player doesnt have any property cards
        if len(current_player_cards_on_field.propertyPileCards) == 0:
            return False

        #wildcard rent cards can be played as long as player has 1 property card on the field
        if player_card.card.rent.primaryColourDetails.colourId is Enum.Colours.Any:
            return True

        expected_primary_colour_id = player_card.card.rent.primaryColourDetails.colourId
        expected_secondary_colour_id = player_card.card.rent.secondaryColourDetails.colourId

        current_player_cards_grouped_by_groupId = []
        key_func = lambda x: x.groupId
        for key, group in itertools.groupby(current_player_cards_on_field.propertyPileCards, key_func):
            cards = list(group)
            currentTotalInSet = len(cards)
            numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
            colourId = cards[0].assignedColourDetails.colourId
            current_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,\
            numberNeededToCompleteSet=numberNeededToCompleteSet,colourId=colourId))
            
        #Note:Asumption assignedColourId is kept up to date
        #find a group with the same colour
        if len([x for x in current_player_cards_grouped_by_groupId if x.colourId == expected_primary_colour_id or x.colourId == expected_secondary_colour_id])>0:
            return True
            
    return False

def is_house_or_hotel_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    #can only be played if a full set exists
    current_player_cards_on_field = next(iter([x for x in game_cards_played_by_all_players if x.playerId==player_card.playerId]),None)
    if(current_player_cards_on_field):

        current_player_cards_grouped_by_groupId = []
        key_func = lambda x: x.groupId
        for key, group in itertools.groupby(current_player_cards_on_field.propertyPileCards, key_func):
            cards = list(group)
            currentTotalInSet = len(cards)
            numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
            current_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
        
        #find a complete set, if there's one  then hotel/housecan be played
        if len([x for x in current_player_cards_grouped_by_groupId if x.currentTotalInSet == x.numberNeededToCompleteSet]) == 0:
            return False    

    return False

def is_double_the_rent_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    current_player_cards_on_field = next(iter([x for x in game_cards_played_by_all_players if x.playerId==player_card.playerId]),None)
    if(current_player_cards_on_field):
         #player doesnt have any rent cards in play
        if len(current_player_cards_on_field.inPlayCards) == 0:
            return False
        #check to see if a rent card exists on the board in play
        return True if len([x for x in current_player_cards_on_field.inPlayCards if x.card.cardType == Enum.CardTypes.Rent ])>0 else False
        
    return False


def is_deal_breaker_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    other_player_cards_on_field_list = [x for x in game_cards_played_by_all_players if x.playerId!=player_card.playerId]
    
    for other_player_cards in other_player_cards_on_field_list:
        
        other_player_cards_grouped_by_groupId = []
        key_func = lambda x: x.groupId
        for key, group in itertools.groupby(other_player_cards.propertyPileCards, key_func):
            cards = list(group)
            currentTotalInSet = len(cards)
            numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
            other_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
    
        #find a complete set, if there's one then deal breaker can be done(using > in case it has house)
        if len([x for x in other_player_cards_grouped_by_groupId if x.currentTotalInSet > x.numberNeededToCompleteSet]) > 0:
            return True
    

    return False

def is_sly_deal_playable(player_card,game_cards_played_by_all_players,possible_play_action):

    other_player_cards_on_field_list = [x for x in game_cards_played_by_all_players if x.playerId!=player_card.playerId]
    
    for other_player_cards in other_player_cards_on_field_list:
        
        other_player_cards_grouped_by_groupId = []
        key_func = lambda x: x.groupId
        for key, group in itertools.groupby(other_player_cards.propertyPileCards, key_func):
            cards = list(group)
            currentTotalInSet = len(cards)
            numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
            other_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
    
        #find a non complete set, if there's one then sly deal can be done
        if len([x for x in other_player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet]) > 0:
            return True
    

    return False


def is_forced_deal_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    
    other_player_cards_on_field_list = [x for x in game_cards_played_by_all_players if x.playerId!=player_card.playerId]
    current_player_cards_on_field = next(iter([x for x in game_cards_played_by_all_players if x.playerId==player_card.playerId]))

    
    #player doesnt have any property cards
    if len(current_player_cards_on_field.propertyPileCards) == 0:
        return False

    current_player_cards_grouped_by_groupId = []
    key_func = lambda x: x.groupId
    for key, group in itertools.groupby(current_player_cards_on_field.propertyPileCards, key_func):
        cards = list(group)
        currentTotalInSet = len(cards)
        numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
        current_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
    
    #find a non complete set, if there's nothing then force deal cannot be done
    if len([x for x in current_player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet]) == 0:
        return False


    for other_player_cards in other_player_cards_on_field_list:
        
        other_player_cards_grouped_by_groupId = []
        key_func = lambda x: x.groupId
        for key, group in itertools.groupby(other_player_cards.propertyPileCards, key_func):
            cards = list(group)
            currentTotalInSet = len(cards)
            numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
            other_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
    
        #find a non complete set, if there's one then force deal can be done
        if len([x for x in other_player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet]) > 0:
            return True
    
    return False

def is_its_my_birthday_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    #Just need 1 player to have card on the field
    other_player_cards_on_field_list = [x for x in game_cards_played_by_all_players if x.playerId!=player_card.playerId and (len(x.propertyPileCards)>0 or len(x.cashPileCards)>0)]
    return True if len(other_player_cards_on_field_list)>0 else False

def is_debt_collector_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    #Just need 1 player to have card on the field
    other_player_cards_on_field_list = [x for x in game_cards_played_by_all_players if x.playerId!=player_card.playerId and (len(x.propertyPileCards)>0 or len(x.cashPileCards)>0)]
    return True if len(other_player_cards_on_field_list)>0 else False

def is_just_say_no_playable(player_card,game_cards_played_by_all_players,possible_play_action):
    #for pre-move-check its always a no, the player cant play just say no to in play pile as part of their current turnunless they were asked to play it as part of an action erquest
    return False

def is_rotate_property_available(player_card,game_cards_played_by_all_players,possible_play_action):
    
    #card is not on property pile or is not rotatable
    if player_card.card.properties.primaryColourDetails.colourId is Enum.Colours.Any or \
        player_card.cardLocationStatus != Enum.GameCardLocationStatus.IsPlayedOnPropertyPile or \
        player_card.card.properties.isRotatable is False:
        return False
    else:
        current_player_cards_on_field = next(iter([x for x in game_cards_played_by_all_players if x.playerId==player_card.playerId]))
        
        current_player_cards_grouped_by_groupId = []
        key_func = lambda x: x.groupId
        for key, group in itertools.groupby(current_player_cards_on_field.propertyPileCards, key_func):
            cards = list(group)
            currentTotalInSet = len(cards)
            numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
            current_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))
        #can only rotate card if its a full set without house or partial set
        if len([x for x in current_player_cards_grouped_by_groupId if x.currentTotalInSet <= x.numberNeededToCompleteSet and x.groupId == player_card.groupId]) > 0:
            return True
        else:
            return True


def is_move_wild_property_available(player_card,game_cards_played_by_all_players,possible_play_action):

    if player_card.card.properties.primaryColourDetails.colourId is not Enum.Colours.Any and \
        player_card.cardLocationStatus != Enum.GameCardLocationStatus.IsPlayedOnPropertyPile:
        return False

    current_player_cards_on_field = next(iter([x for x in game_cards_played_by_all_players if x.playerId==player_card.playerId]))

    
    current_player_cards_grouped_by_groupId = []
    key_func = lambda x: x.groupId
    for key, group in itertools.groupby(current_player_cards_on_field.propertyPileCards, key_func):
        cards = list(group)
        currentTotalInSet = len(cards)
        numberNeededToCompleteSet = cards[0].assignedColourDetails.numberNeededToCompleteSet
        current_player_cards_grouped_by_groupId.append(GroupedCards(groupId=key,currentTotalInSet = currentTotalInSet,numberNeededToCompleteSet=numberNeededToCompleteSet))

    #find a non complete set and current set must be full set(without hotel/house) or partial set, if there's one then wildcard can be moved
    if len([x for x in current_player_cards_grouped_by_groupId if x.currentTotalInSet < x.numberNeededToCompleteSet and x.groupId != player_card.groupId]) > 0 and \
        len([x for x in current_player_cards_grouped_by_groupId if x.currentTotalInSet <= x.numberNeededToCompleteSet and x.groupId == player_card.groupId]) > 0:
        return True
    else:
        return False

def is_pre_check_condition_valid(player_card,game_cards_played_by_all_players,possible_play_action):

    pre_check_conditions = {
        (Enum.CardTypes.Properties,None,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile):is_property_playable,
        (Enum.CardTypes.Rent,None,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_rent_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.Hotel,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile):is_house_or_hotel_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.House,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile):is_house_or_hotel_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.DoubleTheRent,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_double_the_rent_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.ItsMyBirthday,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_its_my_birthday_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.DebtCollector,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_debt_collector_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.JustSayNo,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_just_say_no_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.SlyDeal,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_sly_deal_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.ForcedDeal,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_forced_deal_playable,
        (Enum.CardTypes.Action,Enum.ActionTypes.DealBreaker,Enum.GameCardLocationStatus.IsOnHand,Enum.GameCardLocationStatus.IsInPlay):is_deal_breaker_playable,
        (Enum.CardTypes.Properties,Enum.ActionTypes.RotateCard,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile):is_rotate_property_available,   
        (Enum.CardTypes.Properties,Enum.ActionTypes.MoveCard,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile):is_move_wild_property_available
    }
    try:
        return pre_check_conditions[(possible_play_action.cardType,possible_play_action.actionType,possible_play_action.currentGameCardLocation,possible_play_action.expectedGameCardLocation)](player_card,game_cards_played_by_all_players,possible_play_action)
    except KeyError:
        raise FieldValidationException(message="Pre Check Condition not met. One or more of the specified conditions are not configured correctly.")
