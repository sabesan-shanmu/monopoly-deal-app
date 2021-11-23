import random 
from monopoly.models import GameCards
import monopoly.common.enums as Enum
from monopoly.common.constants import INITIAL_NUMBER_OF_CARDS
from monopoly import db
from sqlalchemy import exc,and_
from monopoly.common import constants,enums

def create_game_cards(game,players,cards):
    try:
        game_cards = []
        full_list = cards if game.gameMode.value == enums.GameMode.RegularMode.value else [*cards,*cards]
        while len(full_list)>0:
            selected_index = random.randint(0,len(full_list)-1)
            selected_card = full_list.pop(selected_index)
            game_cards.append(GameCards(gamePassCode=game.gamePassCode,name=selected_card.name,cardId=selected_card.cardId,cardLocationStatus=Enum.GameCardLocationStatus.IsNotDrawn))
        
        list_of_game_cards=list(range(0,len(game_cards)))
        for player in players:
            for i in range(INITIAL_NUMBER_OF_CARDS):
                selected_index = random.randint(0,len(list_of_game_cards)-1)
                selected_game_card_id = list_of_game_cards.pop(selected_index)
                game_cards[selected_game_card_id].playerId=player.playerId
                game_cards[selected_game_card_id].cardLocationStatus=Enum.GameCardLocationStatus.IsOnHand
                
        db.session.bulk_save_objects(game_cards)
        db.session.commit()
    except:
        db.session.rollback()
        raise
    
def get_game_card_by_id(gameCardId):
    return db.session.query(GameCards).filter_by(gameCardId=gameCardId).first()

def get_game_cards_in_play(gamePassCode):
    return db.session.query(GameCards).filter(and_(GameCards.gamePassCode==gamePassCode,GameCards.cardLocationStatus.in_([Enum.GameCardLocationStatus.IsPlayedOnCashPile,Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,Enum.GameCardLocationStatus.IsInPlay]))).all()

def get_game_cards_on_hand(gamePassCode,playerId):
    return db.session.query(GameCards).filter(and_(GameCards.gamePassCode==gamePassCode,GameCards.playerId==playerId,GameCards.cardLocationStatus.in_([Enum.GameCardLocationStatus.IsOnHand]))).all()

def draw_game_cards(gamePassCode,number):
    return db.session.query(GameCards).filter(and_(GameCards.gamePassCode==gamePassCode,GameCards.playerId == None,GameCards.cardLocationStatus.in_([Enum.GameCardLocationStatus.IsNotDrawn]))).limit(number).all()


def reshuffle_game_cards():
    pass

def discard_game_cards(gameCards):
    pass

def update_game_cards(gameCards):
    try:
        db.session.bulk_save_objects(gameCards)
        db.session.commit()
        return gameCards
    except:
        db.session.rollback()
        raise



def update_game_card(gameCard):
    try:
        gameCardUpdate=get_game_card_by_id(gameCard.gameCardId)
        gameCardUpdate=gameCard
        db.session.commit()
        return gameCardUpdate
    except:
        db.session.rollback()
        raise