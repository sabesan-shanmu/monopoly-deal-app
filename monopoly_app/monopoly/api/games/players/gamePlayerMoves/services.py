from monopoly.models import GamePlayerMoves,Player
import monopoly.common.enums as Enum
from monopoly.common.constants import INITIAL_NUMBER_OF_CARDS,EXPECTED_GAME_MOVE_STATUS,MAX_NUMBER_OF_MOVES
from monopoly import db
from sqlalchemy import exc




def get_player_game_order(players,playerId):
    return[x for x in players if x.playerId==playerId][0].playerGameOrder 

def get_next_player_id(players,playerGameOrder):
    return[x for x in players if x.playerGameOrder==playerGameOrder][0].playerId 

def is_player_moves_status_valid(current_player_move,update_player_move):
    return EXPECTED_GAME_MOVE_STATUS[current_player_move.gameMoveStatus] == update_player_move.gameMoveStatus


def is_player_move_count_valid(current_player_move,update_player_move):
    return current_player_move.gameMoveStatus == GameMoveStatus.MoveComplete 


def is_player_valid(current_player_move,playerId):
    return current_player_move.currentPlayerId == playerId




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
