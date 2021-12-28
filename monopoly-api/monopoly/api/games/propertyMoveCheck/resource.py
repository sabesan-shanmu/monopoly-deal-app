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
from .services import get_property_moves
from .schema import PropertyMoveCheckSchema

property_move_check_namespace = Namespace('PropertyMoveCheck', description='Resource to check which properties can be updated on property pile')

@property_move_check_namespace.route('/')
class PropertyMoveCheckResource(Resource):
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
                raise FieldValidationException(message="Player not allowed to perform in property move check")

      

            if currentPlayerMove.transactionTracker and currentPlayerMove.transactionTracker.transactionTrackerStatus is not Enum.TransactionTrackerStatus.Completed \
            or currentPlayerMove.gameMoveStatus is not Enum.GameMoveStatus.MoveInProgress:
                raise FieldValidationException(message="Move must be in progress and transactions must be completed") 

            #current player property cards
            currentPlayer = [player for player in gameFound.players if player.playerId == identity["playerId"]]
            
            property_move_check_list = get_property_moves(currentPlayer[0].propertyPileCards)
            result = PropertyMoveCheckSchema(many=True).dump(property_move_check_list)
            
            
            return result
        
        except ValidationError as e:
            raise ResourceValidationException(e) 




