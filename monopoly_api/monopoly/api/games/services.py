from monopoly.models import Game
from monopoly import db
from sqlalchemy import update,exc

def get_games():
    return db.session.query(Game).all()

def get_game_by_gamepasscode(gamePassCode):
    return db.session.query(Game).filter_by(gamePassCode=gamePassCode).first()

def get_game_by_gameid(gameId):
    return db.session.query(Game).filter_by(gameId=gameId).first()

def create_game(game):
    try:
        db.session.add(game)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise

def delete_game(game):
    try:
        db.session.delete(game)
        db.session.commit() 
    except exc.IntegrityError:
        db.session.rollback()
        raise

def update_game(game):
    try:
        gameUpdate=get_game_by_gamepasscode(game.gamePassCode)
        gameUpdate.gameStatus=game.gameStatus
        db.session.commit()
        return gameUpdate
    except exc.IntegrityError:
        db.session.rollback()
        raise


