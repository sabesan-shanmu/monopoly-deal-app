from flask_restx import Resource,Namespace
from flask import request,jsonify   
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.api.games.gamePlayerMoves.services import is_player_valid
from monopoly.api.games.gamePlayerMoves.services import get_game_player_moves,update_game_player_moves
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from .services import get_transaction_tracker,get_transaction_trackers,add_transaction_tracker,modify_transaction_tracker
from .schema import TransactionTrackerSchema,create_transaction_tracker,updated_transaction_tracker
from flask_jwt_extended import get_jwt_identity
from monopoly.api.games.gamePlayerMoves.schema import GamePlayerMovesSchema
import monopoly.notifications.gameMoves as gameMovesNotification
from monopoly.api.games.transactionTracker.tradePayeeTransaction.services import get_trade_payee_transaction_trackers



transaction_tracker_namespace = Namespace('TransactionTracker', description='Resource to track the player actions on their turn.')


@transaction_tracker_namespace.route('/')
class ManyTransactionTrackerResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode):
        try:
            identity = get_jwt_identity()
            transaction_tracker = create_transaction_tracker().load(request.get_json())

            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise ResourceNotFoundException(message="No Current Moves found")

            if current_player_move.currentPlayerId != identity["playerId"] or transaction_tracker.performedByPlayerId != identity["playerId"]:
                raise FieldValidationException(message="Requested player is unable to start an action.")
            elif current_player_move.transactionTrackerId is not None:
                raise FieldValidationException(message="Unable to start a new action while an action is in progress.")

            add_transaction_tracker(transaction_tracker)
            result = TransactionTrackerSchema().dump(transaction_tracker)
            current_player_move.transactionTrackerId=transaction_tracker.transactionTrackerId
            update_game_player_moves(current_player_move)

            #check to see if transaction payee table needs to be updated
            #TODO
            
            #publish updated game move 
            updated_game_moves_result = GamePlayerMovesSchema().dump(current_player_move)
            gameMovesNotification.publish_game_moves_update_event_to_room(gamePassCode,updated_game_moves_result)


            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)
    
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)     
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            transaction_trackers = get_transaction_trackers(game.gameId)
            
            result= TransactionTrackerSchema(many=True).dump(transaction_trackers)
            return jsonify(result)

        except ValidationError as e:
            raise ResourceValidationException(e)

@transaction_tracker_namespace.route('/<int:transactionTrackerId>/')
class SingleTransactionTrackerResource(Resource):
    @validate_gamepassCode
    @validate_player
    def patch(self,gamePassCode,transactionTrackerId):
        try:
            identity = get_jwt_identity()
            transaction_tracker = updated_transaction_tracker().load(request.get_json())
            game = get_game_by_gamepasscode(gamePassCode)             
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   


            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise ResourceNotFoundException(message="No Current Moves found")
            
            if current_player_move.currentPlayerId != identity["playerId"]:
                raise FieldValidationException(message="Requested player is unable to update an action.")

            trade_payee_transactions = get_trade_payee_transaction_trackers(transactionTrackerId)

            if len([x for x in trade_payee_transactions if x.isPayeeTransactionCompleted == False])>0:
                raise FieldValidationException(message="Trade Transaction is not complete")

            #update transaction tracker
            update_transaction_tracker = modify_transaction_tracker(transaction_tracker)
            result = TransactionTrackerSchema().dump(update_transaction_tracker)
            
            
            #publish updated game move 
            update_player_move = get_game_player_moves(game.gameId)
            updated_game_moves_result = GamePlayerMovesSchema().dump(update_player_move)
            gameMovesNotification.publish_game_moves_update_event_to_room(gamePassCode,updated_game_moves_result)

            
            return jsonify(result) 

        except ValidationError as e:
            raise ResourceValidationException(e)

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,transactionTrackerId):
        try:
            game = get_game_by_gamepasscode(gamePassCode)     
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            transaction_tracker = get_transaction_tracker(transactionTrackerId)
            
            if transaction_tracker is None:
                raise ResourceNotFoundException(message="Game Action Tracker Not Found")   
            
            result = TransactionTrackerSchema().dump(transaction_tracker)

            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)

