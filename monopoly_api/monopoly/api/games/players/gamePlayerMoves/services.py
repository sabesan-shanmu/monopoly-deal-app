from monopoly.models import GamePlayerMoves,Player
import monopoly.common.enums as Enum
from monopoly.common.constants import INITIAL_NUMBER_OF_CARDS
from monopoly import db
from sqlalchemy import exc


def create_game_player_moves(game):
    try:
        gamePlayerMoves = GamePlayerMoves(
            gameId = game.gameId,
            currentPlayerId = sorted(game.players,key=lambda x:x.playerGameOrder)[0].playerId 
                            if len(game.players)>0 else None
        )
        db.session.add(gamePlayerMoves)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise

def get_game_player_moves(gameId):
    return db.session.query(GamePlayerMoves).filter_by(gameId=gameId).first()

def update_game_player_moves(gamePlayerMove):
    try:
        GamePlayerMoves.query.filter_by(gameId=gamePlayerMove.gameId).update(dict(gamePlayerMove))
        db.session.commit()
        return gamePlayerMove
    except exc.IntegrityError:
        db.session.rollback()
        raise
