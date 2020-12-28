from .enums import GameMoveStatus

MAX_NUMBER_OF_PLAYERS = 5
MIN_NUMBER_OF_PLAYERS = 2


INITIAL_NUMBER_OF_CARDS = 5


MAX_NUMBER_OF_MOVES = 3

EXPECTED_GAME_MOVE_STATUS = {
    GameMoveStatus.WaitingForPlayerToBeginMove: GameMoveStatus.MoveInProgress,
    GameMoveStatus.MoveInProgress:GameMoveStatus.MoveComplete,
    GameMoveStatus.MoveComplete:GameMoveStatus.WaitingForPlayerToBeginMove
}






