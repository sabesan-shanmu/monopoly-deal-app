from monopoly.models import Player
from monopoly import db
from sqlalchemy import and_,exc
from monopoly.common import constants,enums

def get_players_by_gameid(gameId):
    return db.session.query(Player).filter_by(gameId=gameId).all()

def get_player_by_player_name(gameId,playerName):
    return db.session.query(Player).filter(and_(Player.playerName.ilike(playerName),Player.gameId==gameId)).first()
            

def add_player(player):
    try:
        db.session.add(player)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise


def is_player_allowed_to_join(game):
    if game.gameStatus == enums.GameStatus.WaitingToStart and ((game.gameMode == enums.GameMode.RegularMode and len(game.players) < constants.MAX_NUMBER_OF_PLAYERS_BASIC_MODE) or (game.gameMode == enums.GameMode.ExtendedMode and len(game.players) < constants.MAX_NUMBER_OF_PLAYERS_EXTENDED_MODE)):
        return True
    else:
        return False    
          