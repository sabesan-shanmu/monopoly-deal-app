from monopoly.models import GamePlayerMoves,Player
import monopoly.common.enums as Enum
from monopoly import db
from sqlalchemy import exc

#player can only progress to complete if an action has been started
def is_game_action_tracker_valid(current_player_move):
    return False if current_player_move.gameMoveStatus == Enum.GameMoveStatus.MoveInProgress and current_player_move.transactionTrackerId is None else True

def get_player_game_order(players,playerId):
    return[x for x in players if x.playerId==playerId][0].playerGameOrder 

def get_next_player_id(players,playerGameOrder):
    return[x for x in players if x.playerGameOrder==playerGameOrder][0].playerId 

def is_player_moves_status_valid(current_player_move,updated_player_move): 
    return len([ x for x in EXPECTED_GAME_MOVE_STATUS[current_player_move.gameMoveStatus] if x == updated_player_move.gameMoveStatus])>0 \
        and len([ x for x in ALLOWED_MOVE_STATUS[current_player_move.numberOfMovesPlayed] if x == current_player_move.gameMoveStatus])>0 



def is_player_move_count_valid(current_player_move,update_player_move):
    return current_player_move.gameMoveStatus == Enum.GameMoveStatus.MoveComplete 


def is_player_valid(current_player_move,playerId):
    return current_player_move.currentPlayerId == playerId

# current status -> new status 
EXPECTED_GAME_MOVE_STATUS = {
    Enum.GameMoveStatus.WaitingForPlayerToBeginMove: [Enum.GameMoveStatus.MoveInProgress,Enum.GameMoveStatus.DrawTwoCardsInProgress,Enum.GameMoveStatus.SkipYourTurn],
    Enum.GameMoveStatus.DrawTwoCardsInProgress:[Enum.GameMoveStatus.MoveInProgress],
    Enum.GameMoveStatus.MoveInProgress:[Enum.GameMoveStatus.MoveComplete],
    Enum.GameMoveStatus.MoveComplete:[Enum.GameMoveStatus.WaitingForPlayerToBeginMove,Enum.GameMoveStatus.MoveInProgress,Enum.GameMoveStatus.SkipYourTurn]
}
ALLOWED_MOVE_STATUS = {
    0:[Enum.GameMoveStatus.WaitingForPlayerToBeginMove,Enum.GameMoveStatus.DrawTwoCardsInProgress,Enum.GameMoveStatus.MoveInProgress,Enum.GameMoveStatus.MoveComplete],
    1:[Enum.GameMoveStatus.WaitingForPlayerToBeginMove,Enum.GameMoveStatus.MoveInProgress,Enum.GameMoveStatus.MoveComplete],
    2:[Enum.GameMoveStatus.WaitingForPlayerToBeginMove,Enum.GameMoveStatus.MoveInProgress,Enum.GameMoveStatus.MoveComplete]
}

def create_game_player_moves(game):
    try:
        gamePlayerMoves = GamePlayerMoves(
            gameId = game.gameId,
            currentPlayerId = sorted(game.players,key=lambda x:x.playerGameOrder)[0].playerId 
                            if len(game.players)>0 else None
        )
        db.session.add(gamePlayerMoves)
        db.session.commit()
        return gamePlayerMoves
    except exc.IntegrityError:
        db.session.rollback()
        raise

def get_game_player_moves(gameId):
    return db.session.query(GamePlayerMoves).filter_by(gameId=gameId).first()

def update_game_player_moves(updateGamePlayerMove):
    try:
        gamePlayerMove = db.session.query(GamePlayerMoves).filter_by(gameId=updateGamePlayerMove.gameId).first()
        gamePlayerMove.numberOfMovesPlayed =updateGamePlayerMove.numberOfMovesPlayed 
        gamePlayerMove.totalGameMoveCount=updateGamePlayerMove.totalGameMoveCount
        gamePlayerMove.gameMoveStatus=updateGamePlayerMove.gameMoveStatus
        gamePlayerMove.currentPlayerId=updateGamePlayerMove.currentPlayerId
        gamePlayerMove.transactionTrackerId=updateGamePlayerMove.transactionTrackerId
        db.session.commit()
        return gamePlayerMove
    except exc.IntegrityError:
        db.session.rollback()
        raise
