from monopoly.models import GameInPlayCard
from monopoly import db
from sqlalchemy import and_,exc

def get_game_in_play_card(gameId):
    return db.session.query(GameInPlayCard).filter_by(gameId=gameId).first()

def update_game_in_play_card(gameInPlaydCard):
    try:
        GameInPlayCard.query.filter_by(gameId=gameInPlaydCard.gameId).update(dict(gameInPlaydCard))
        db.session.commit()
        return gameInPlaydCard
    except:
        db.session.rollback()
        raise

def create_game_in_play_card(game):
    try:
        gameInPlaydCard =  GameInPlayCard(
            gameId = game.gameId
        )
        db.session.add(gameInPlaydCard)
        db.session.commit()
    except:
        db.session.rollback()
        raise