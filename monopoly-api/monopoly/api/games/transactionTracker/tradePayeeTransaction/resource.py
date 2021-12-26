from flask_restx import Resource,Namespace
from flask import request,jsonify   
from monopoly.exceptions import FieldValidationException, ResourceNotFoundException, ResourceValidationException
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.api.games.players.services import get_player_by_player_id
from flask_jwt_extended.utils import get_jwt_identity
from .schema import TradePayeeTransactionSchema,create_trade_payee_transaction,update_trade_payee_transaction
from monopoly.api.games.transactionTracker.services import get_transaction_tracker
import monopoly.common.enums as Enum
from .services import get_trade_payee_transaction_trackers,save_trade_payee_transactions
from monopoly.api.games.gamePlayerMoves.services import get_game_player_moves
from monopoly.api.games.gamePlayerMoves.schema import GamePlayerMovesSchema
import monopoly.notifications.gameMoves as gameMovesNotification
from marshmallow import ValidationError
from monopoly.auth import validate_gamepassCode,validate_player

trade_payee_tracker_namespace = Namespace('TradePayeeTracker', description='Resource to track trade transactions')


@trade_payee_tracker_namespace.route('/')
class ManyTradePayeeTransactionResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode,transactionTrackerId):
        try:
            current_user = get_jwt_identity()
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")

            playerFound = get_player_by_player_id(game.gameId,current_user["playerId"])
            if playerFound is None:
                raise ResourceNotFoundException(message="Player Not Found")  

            transaction_tracker = get_transaction_tracker(transactionTrackerId)
                
            if transaction_tracker is None:
                raise ResourceNotFoundException(message="Game Transaction Tracker Not Found")  

            if transaction_tracker.transactionTrackerStatus == Enum.TransactionTrackerStatus.Completed:
                raise ResourceNotFoundException(message="Game Transaction Tracker is complete")

            trade_payee_transactions = get_trade_payee_transaction_trackers(transactionTrackerId)

            if len(trade_payee_transactions)>0:
                raise FieldValidationException(message="Unable to create new transaction.Transaction has an existing trade in progress")  

            new_trade_payee_transactions = create_trade_payee_transaction(many=True).load(request.get_json());


            updated_payee_transactions = save_trade_payee_transactions(new_trade_payee_transactions)
            

            #publish updated game move 
            update_player_move = get_game_player_moves(game.gameId)
            updated_game_moves_result = GamePlayerMovesSchema().dump(update_player_move)
            gameMovesNotification.publish_game_moves_update_event_to_room(gamePassCode,updated_game_moves_result)

            result = TradePayeeTransactionSchema(many=True).dump(updated_payee_transactions)

            return jsonify(result) 

        except ValidationError as e:
            raise ResourceValidationException(e)

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,transactionTrackerId):
        pass


@trade_payee_tracker_namespace.route('/<int:tradePayeeTransactionId>/')
class SingleTradePayeeTransactionResource(Resource):
    @validate_gamepassCode
    @validate_player
    def put(self,gamePassCode,transactionTrackerId,tradePayeeTransactionId):
        pass

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,transactionTrackerId,tradePayeeTransactionId):
        pass