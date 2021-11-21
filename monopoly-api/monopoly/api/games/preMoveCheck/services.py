import monopoly.common.enums as Enum
from monopoly.exceptions import FieldValidationException


def get_pre_move_check_list(player_cards_on_hand,game_cards_in_play,game_play_actions):
    pre_move_check_list = []
    
    for player_card in player_cards_on_hand:

        cardType = player_card.card.cardType
        actionType = player_card.card.action.actionType if player_card.card.action is not None else None
        possible_play_actions = [x for x in game_play_actions if x.actionType==actionType and x.cardType==cardType]
        
        preMoveCheck = PreMoveCheck(gameCardId=player_card.gameCardId)

        for possible_play_action in possible_play_actions:
            if possible_play_action.isPreCheckRequired is True and is_pre_check_condition_valid(player_cards_on_hand,game_cards_in_play,possible_play_action):
                preMoveCheck.add_precheck_card(possible_play_action)
            elif possible_play_action.isPreCheckRequired is False:
                preMoveCheck.add_precheck_card(possible_play_action)
        
        pre_move_check_list.append(preMoveCheck)
            
    return pre_move_check_list


class PreMoveCheck:

    def __init__(self,gameCardId):
        self.gameCardId = gameCardId
        self.possibleMoves = []

    def add_precheck_card(self,possiblePlayAction):
        self.possibleMoves.append(possiblePlayAction)


def is_property_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False



def is_rent_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_house_or_hotel_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    #can only be played if a full set exists

    return False

def is_double_the_rent_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_its_my_birthday_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_debt_collector_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_just_say_no_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_sly_deal_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_forced_deal_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_deal_breaker_playable(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_rotate_or_move_property_available(player_cards_on_hand,game_cards_in_play,possible_play_action):
    return False

def is_pre_check_condition_valid(player_cards_on_hand,game_cards_in_play,possible_play_action):

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
        (Enum.CardTypes.Properties,None,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile):is_rotate_or_move_property_available,
    }
    try:
        return pre_check_conditions[(possible_play_action.cardType,possible_play_action.actionType,possible_play_action.currentGameCardLocation,possible_play_action.expectedGameCardLocation)](player_cards_on_hand,game_cards_in_play,possible_play_action)
    except KeyError:
        raise FieldValidationException(message="Pre Check Condition not met. One or more of the specified conditions are not configured correctly.")
