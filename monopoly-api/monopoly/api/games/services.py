from monopoly.models import Game
from monopoly import db
from monopoly.common import constants,enums


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
    except:
        db.session.rollback()
        raise

def delete_game(game):
    try:
        db.session.delete(game)
        db.session.commit() 
    except:
        db.session.rollback()
        raise
        

def update_game(game):
    try:
        gameUpdate=get_game_by_gamepasscode(game.gamePassCode)
        gameUpdate.gameStatus=game.gameStatus
        db.session.commit()
        return gameUpdate
    except:
        db.session.rollback()
        raise


def is_game_allowed_to_start(game):
    if game.gameStatus.value == enums.GameStatus.WaitingToStart.value and ((game.gameMode.value == enums.GameMode.RegularMode.value and len(game.players) >= constants.MIN_NUMBER_OF_PLAYERS_BASIC_MODE) or (game.gameMode.value == enums.GameMode.ExtendedMode.value and len(game.players) >= constants.MIN_NUMBER_OF_PLAYERS_EXTENDED_MODE)):
        return True
    else:
        return False    

def is_player_allowed_to_join(game):
    if game.gameStatus.value == enums.GameStatus.WaitingToStart.value and ((game.gameMode.value == enums.GameMode.RegularMode.value and len(game.players) < constants.MAX_NUMBER_OF_PLAYERS_BASIC_MODE) or (game.gameMode.value == enums.GameMode.ExtendedMode.value and len(game.players) < constants.MAX_NUMBER_OF_PLAYERS_EXTENDED_MODE)):
        return True
    else:
        return False    