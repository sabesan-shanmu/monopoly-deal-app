
from flask_restx import Resource,Namespace
from flask import request,jsonify
from .services import get_game_player_moves,update_game_player_moves,get_player_game_order,\
get_next_player_id,is_player_moves_status_valid,\
is_player_move_count_valid,is_player_valid,is_game_action_tracker_valid,get_winner_id
from monopoly.api.games.services import get_game_by_gamepasscode,update_game
from .schema import GamePlayerMovesSchema,update_player_moves
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.common.enums import GameMoveStatus
from monopoly.common.constants import MAX_NUMBER_OF_MOVES,INITIAL_NUMBER_OF_CARDS
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity
import monopoly.notifications.gameMoves as gameMovesNotification
import monopoly.common.enums as Enum
from monopoly.api.games.gameCards.services import discard_game_cards
from monopoly.api.games.schema import GameSchema
from monopoly.notifications.games import publish_game_update_event_to_room
from monopoly.api.games.players.services import get_player_by_player_id



game_player_moves_namespace = Namespace('GamePlayerMoves', description='Resource to track the player moves')


@game_player_moves_namespace.route('/')
class GamePlayerMovesResource(Resource):
    @validate_gamepassCode
    @validate_player
    def patch(self,gamePassCode):
        try:

            identity = get_jwt_identity()
            updated_player_move = update_player_moves().load(request.get_json())
            
            game = get_game_by_gamepasscode(gamePassCode)
            
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise FieldValidationException(message="No Current Moves found")

            if not is_player_moves_status_valid(current_player_move,updated_player_move):
                raise FieldValidationException(message="Invalid Game Status")

            if not (is_player_valid(current_player_move,identity["playerId"]) and is_player_valid(updated_player_move,identity["playerId"])):
                raise FieldValidationException(message="Player not allowed to update")

            if not is_game_action_tracker_valid(current_player_move):
                raise FieldValidationException(message="Cannot progress without performing an action.")

            
            if updated_player_move.gameMoveStatus == GameMoveStatus.MoveComplete and current_player_move.transactionTracker is not None and current_player_move.transactionTracker.transactionTrackerStatus is not Enum.TransactionTrackerStatus.Completed:
                raise FieldValidationException(message="Cannot progress to complete without completing action")

            playerFound = get_player_by_player_id(game.gameId,identity["playerId"])
            if playerFound is None:
                raise ResourceNotFoundException(message="Player Not Found")  

            
            updated_player_move.totalGameMoveCount = current_player_move.totalGameMoveCount
            updated_player_move.transactionTrackerId = current_player_move.transactionTrackerId if updated_player_move.gameMoveStatus != GameMoveStatus.MoveComplete else None
            updated_player_move.gameId = current_player_move.gameId
            updated_player_move.numberOfMovesPlayed = current_player_move.numberOfMovesPlayed + 1 if updated_player_move.gameMoveStatus == GameMoveStatus.MoveComplete else current_player_move.numberOfMovesPlayed      
            
            #move to the next player since player completed their turn or skipped their turn
            if (updated_player_move.gameMoveStatus == GameMoveStatus.MoveComplete 
                and updated_player_move.numberOfMovesPlayed == MAX_NUMBER_OF_MOVES) or updated_player_move.gameMoveStatus == GameMoveStatus.SkipYourTurn:
                
                if  len(playerFound.onHandCards)>INITIAL_NUMBER_OF_CARDS:
                    updated_player_move.gameMoveStatus = GameMoveStatus.DiscardExtraCards
                    updated_player_move.numberOfMovesPlayed = current_player_move.numberOfMovesPlayed 
                else:
                    currentPlayerGameOrder = get_player_game_order(game.players,current_player_move.currentPlayerId)
                    updated_player_move.currentPlayerId = get_next_player_id(game.players,1) if len(game.players) == currentPlayerGameOrder else get_next_player_id(game.players,currentPlayerGameOrder+1) 
                    updated_player_move.totalGameMoveCount +=1
                    updated_player_move.numberOfMovesPlayed = 0
                    updated_player_move.gameMoveStatus = GameMoveStatus.WaitingForPlayerToBeginMove
                    #clear the play pile
                    discard_game_cards(gamePassCode)
                    #publish updated game
                    updated_game = get_game_by_gamepasscode(gamePassCode)
                    update_game_result = GameSchema().dump(updated_game)
                    publish_game_update_event_to_room(gamePassCode,update_game_result)
                            
        
            #check to see if theres a winner
            winner_found = get_winner_id(game)
            if winner_found:
                #update winner
                game.gameStatus=Enum.GameStatus.Completed
                game.gameWinnerId= winner_found.playerId
                update_game(game)
                #publish updated game
                updated_game = get_game_by_gamepasscode(gamePassCode)
                update_game_result = GameSchema().dump(updated_game)
                publish_game_update_event_to_room(gamePassCode,update_game_result)

          

            gamePlayerMove = update_game_player_moves(updated_player_move)

            updated_game_moves_result = GamePlayerMovesSchema().dump(gamePlayerMove)
            
            #publish updated game move 
            gameMovesNotification.publish_game_moves_update_event_to_room(gamePassCode,updated_game_moves_result)

            return jsonify(updated_game_moves_result)
        except ValidationError as e:
            raise ResourceValidationException(e)
            
    @validate_gamepassCode
    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise ResourceNotFoundException(message="No Current Moves found")   

            result = GamePlayerMovesSchema().dump(current_player_move)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)


