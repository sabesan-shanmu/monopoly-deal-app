
from flask_restx import Resource
from flask import request,jsonify
from marshmallow import ValidationError
from .services import get_game_player_moves,update_game_player_moves
from monopoly.api.games.services import get_game_by_gamepasscode
from .schema import GamePlayerMovesSchema,update_player_moves
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.common.enums import GameMoveStatus
from monopoly.common.constants import EXPECTED_GAME_MOVE_STATUS,MAX_NUMBER_OF_MOVES




class GamePlayerMovesResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode,playerId):
        try:
            updated_player_move = update_player_moves().load(request.json())
            game = get_game_by_gamepasscode(gamePassCode)
            
            if game is None:
                return {"errors": "Game Not Found"}, 404        
            
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                return "No Current Moves found",404

            if not is_player_moves_status_valid(current_player_move,updated_player_move):
                return "Invalid Game   Status",400

            if not is_player_valid(current_player_move,playerId):
                return "Player not alowed to update",400

            if (updated_player_move.gameMoveStatus == GameMoveStatus.WaitingForPlayerToBeginMove 
                and current_player_move.numberMovesPlayed == MAX_NUMBER_OF_MOVES):
                currentPlayerGameOrder = get_player_game_order(game.players,current_player_move.currentPlayerId)
                updated_player_move.currentPlayerId = get_next_player_id(game.players,1) if len(game.players) == currentPlayerGameOrder else get_next_player_id(game.players,currentPlayerGameOrder+1) 
                updated_player_move.gameTurn = current_player_move.gameTurn + 1

            updated_player_move.numberMovesPlayed = 1 if current_player_move.numberMovesPlayed == MAX_NUMBER_OF_MOVES else (current_player_move.numberMovesPlayed + 1)
            
            gamePlayerMove = update_game_player_moves(update_game_player_moves)

            result = GamePlayerMovesSchema().dump(gamePlayerMove)
            return jsonify(result)
        except Exception as err:
            print(err)
            return "Internal Server Error",500
            
    @validate_gamepassCode
    def get(self,gamePassCode,playerId):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                return {"errors": "Game Not Found"}, 404 
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                return "No Current Moves found",404

            result = GamePlayerMovesSchema().dump(current_player_move)
            return jsonify(result)
        except Exception as err:
            print(err)
            return "Internal Server Error",500


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