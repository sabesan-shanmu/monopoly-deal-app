import monopoly.common.enums as Enum

MAX_NUMBER_OF_PLAYERS = 5
MIN_NUMBER_OF_PLAYERS = 2


INITIAL_NUMBER_OF_CARDS = 5


MAX_NUMBER_OF_MOVES = 3

EXPECTED_GAME_MOVE_STATUS = {
    Enum.GameMoveStatus.WaitingForPlayerToBeginMove: Enum.GameMoveStatus.MoveInProgress,
    Enum.GameMoveStatus.MoveInProgress:Enum.GameMoveStatus.MoveComplete,
    Enum.GameMoveStatus.MoveComplete:Enum.GameMoveStatus.WaitingForPlayerToBeginMove
}




