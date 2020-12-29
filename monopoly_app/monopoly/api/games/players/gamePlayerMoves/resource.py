
from flask_restx import Resource
from flask import request,jsonify
from .services import get_game_player_moves,update_game_player_moves
from monopoly.api.games.services import get_game_by_gamepasscode,get_player_game_order,
get_next_player_id,is_player_moves_status_valid,is_player_move_count_valid,is_player_valid
from .schema import GamePlayerMovesSchema,update_player_moves
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.common.enums import GameMoveStatus
from monopoly.common.constants import EXPECTED_GAME_MOVE_STATUS,MAX_NUMBER_OF_MOVES
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError



class GamePlayerMovesResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode,playerId):
        try:
            updated_player_move = update_player_moves().load(request.json())
            game = get_game_by_gamepasscode(gamePassCode)
            
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise FieldValidationException(message="No Current Moves found")

            if not is_player_moves_status_valid(current_player_move,updated_player_move):
                raise FieldValidationException(message="Invalid Game Status")

            if not is_player_valid(current_player_move,playerId):
                raise FieldValidationException(message="Player not alowed to update")

            if (updated_player_move.gameMoveStatus == GameMoveStatus.WaitingForPlayerToBeginMove 
                and current_player_move.numberMovesPlayed == MAX_NUMBER_OF_MOVES):
                currentPlayerGameOrder = get_player_game_order(game.players,current_player_move.currentPlayerId)
                updated_player_move.currentPlayerId = get_next_player_id(game.players,1) if len(game.players) == currentPlayerGameOrder else get_next_player_id(game.players,currentPlayerGameOrder+1) 
                updated_player_move.gameTurn = current_player_move.gameTurn + 1

            updated_player_move.numberMovesPlayed = 1 if current_player_move.numberMovesPlayed == MAX_NUMBER_OF_MOVES else (current_player_move.numberMovesPlayed + 1)
            
            gamePlayerMove = update_game_player_moves(update_game_player_moves)

            result = GamePlayerMovesSchema().dump(gamePlayerMove)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)
            
    @validate_gamepassCode
    def get(self,gamePassCode,playerId):
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


