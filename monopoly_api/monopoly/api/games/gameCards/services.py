import random 
from monopoly.models import GameCards
import monopoly.common.enums as Enum
from monopoly.common.constants import INITIAL_NUMBER_OF_CARDS
from monopoly import db
from sqlalchemy import exc,and_

def create_game_cards(gameId,players,cards):
    try:
        game_cards = []
        while len(cards)>0:
            selected_index = random.randint(0,len(cards)-1)
            selected_card = cards.pop(selected_index)
            game_cards.append(GameCards(gameId=gameId,cardId=selected_card.cardId,cardStatus=Enum.GameCardStatus.IsNotDrawn))
        
        list_of_game_cards=list(range(0,len(game_cards)))
        for player in players:
            for i in range(INITIAL_NUMBER_OF_CARDS):
                selected_index = random.randint(0,len(list_of_game_cards)-1)
                selected_game_card_id = list_of_game_cards.pop(selected_index)
                game_cards[selected_game_card_id].playerId=player.playerId
                game_cards[selected_game_card_id].cardStatus=Enum.GameCardStatus.IsOnHand
                
        db.session.bulk_save_objects(game_cards)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise
    

def get_game_cards_in_play(gameId):
    return db.session.query(GameCards).filter(and_(GameCards.gameId==gameId,GameCards.cardStatus.in_([Enum.GameCardStatus.IsPlayedOnCashPile,Enum.GameCardStatus.IsPlayedOnPropertyPile]))).all()

def get_game_cards_on_hand(gameId,playerId):
    return db.session.query(GameCards).filter(and_(GameCards.gameId==gameId,GameCards.playerId==playerId,GameCards.cardStatus.in_([Enum.GameCardStatus.IsOnHand]))).all()
