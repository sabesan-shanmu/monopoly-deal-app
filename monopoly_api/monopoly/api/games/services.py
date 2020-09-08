from monopoly.models import Game
from monopoly import db
from sqlalchemy import update

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

def delete_game(game):
    db.session.delete(game)
    db.session.commit() 


def update_game(game):
    game = update(game).where(gameId=game.gameId).values(game)
    db.session.commit()
    return game;



