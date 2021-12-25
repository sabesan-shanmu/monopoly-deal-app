from flask import jsonify
from flask_restx import Resource,Namespace
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.services import get_game_by_gamepasscode
from flask_jwt_extended import get_jwt_identity
from monopoly.exceptions import FieldValidationException, ResourceNotFoundException, ResourceValidationException
from monopoly.api.games.gamePlayerMoves.services import get_game_player_moves, is_player_valid
from marshmallow import ValidationError
import monopoly.common.enums as Enum
from monopoly.api.games.players.services import get_player_by_player_id
from .services import get_selection_moves
from .schema import SelectionMoveCheckSchema

selection_move_check_namespace = Namespace('SelectionMoveCheck', description='Resource to check which player may be requested to perform an action')

@selection_move_check_namespace.route('/')
class SelectionMoveCheckResource(Resource):
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode):
        try:
            identity = get_jwt_identity()
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                raise ResourceNotFoundException(message="Game Not Found")
 
            currentPlayerMove = get_game_player_moves(gameFound.gameId)
            if currentPlayerMove is None:
                raise FieldValidationException(message="No Current Moves found")


            if not is_player_valid(currentPlayerMove,identity["playerId"]):
                raise FieldValidationException(message="Player not allowed to perform in move check")

            
            if currentPlayerMove.transactionTracker is None:
                raise FieldValidationException(message="No Transaction was found for user")


            if currentPlayerMove.transactionTracker.actionType not in [Enum.ActionTypes.DoubleTheRent,Enum.ActionTypes.SinglePlayerRent,\
                Enum.ActionTypes.DebtCollector,Enum.ActionTypes.SlyDeal,Enum.ActionTypes.ForcedDeal,Enum.ActionTypes.DealBreaker] \
            or currentPlayerMove.transactionTracker.transactionTrackerStatus is not Enum.TransactionTrackerStatus.OtherPlayerSelection:
                raise FieldValidationException(message="Invalid Status found") 

            #exclude current player
            otherPlayers = [player for player in gameFound.players if player.playerId != identity["playerId"]]
            
            selection_move_check_list = get_selection_moves(currentPlayerMove,otherPlayers)
            result = SelectionMoveCheckSchema().dump(selection_move_check_list)
            
            
            return result
        
        except ValidationError as e:
            raise ResourceValidationException(e) 




