import monopoly.common.enums as Enum

def get_playable_cards(player_cards_on_hand,game_play_actions):
    playable_cards = []
    for player_card in player_cards_on_hand:

        cardType = player_card.card.cardType
        actionType = player_card.card.action.actionType if player_card.card.action is not None else None
        possible_play_actions = [x for x in game_play_actions if x.actionType==actionType and x.cardType==cardType]
        
        for possible_play_action in possible_play_actions:
            if possible_play_action.isPreCheckRequired is None:
                playable_cards = add_precheck_card()

    return playable_cards

def add_precheck_card():
    pass


def is_house_or_hotel_playable():
    pass

def is_double_the_rent_playable():
    pass

def is_its_my_birthday_playable():
    pass

def is_debt_collector_playable():
    pass

def is_just_say_no_playable():
    pass

def is_forced_deal_playable():
    pass

def is_deal_breaker_playable():
    pass