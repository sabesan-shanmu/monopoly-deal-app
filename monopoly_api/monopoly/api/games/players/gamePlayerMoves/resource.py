
from flask_restx import Resource
from flask import request,jsonify
from marshmallow import ValidationError
from .services import get_game_player_moves,update_game_player_moves
from monopoly.api.games.services import get_game_by_gamepasscode
from .schema import GamePlayerMovesSchema,update_player_moves
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.common.enums import GameMoveStatus
from monopoly.common.constants import EXPECTED_GAME_MOVE_STATUS,MAX_NUMBER_OF_MOVES

"""
{
    "turn:":3,
    "status":---
    WaitingForPlayerToBeginMove = 0
    MoveInProgress = 1
    MoveComplete = 2

}


MoveInProgress  |    WaitingForPlayerToBeginMove and current playerid
MoveComplete   |  MoveInProgress and current playyerId and check if actionis complete based on last card played
WaitingForPlayerToBegin| MoveComplete and assign to the next guy  OR player chooses to skip a turn

"""


class GamePlayerMovesResource(Resource):
    #@validate_gamepassCode
    #@validate_player
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
                return "Invalid Game Status",400

            if (updated_player_move.gameMoveStatus == GameMoveStatus.WaitingForPlayerToBeginMove 
                and current_player_move.numberMovesPlayed == MAX_NUMBER_OF_MOVES):
                currentPlayerGameOrder = get_player_game_order(game.players,current_player_move.currentPlayerId)
                updated_player_move.currentPlayerId = get_next_player_id(game.players,1) if len(game.players) == currentPlayerGameOrder else get_next_player_id(game.players,currentPlayerGameOrder+1) 

            updated_player_move.numberMovesPlayed = 1 if current_player_move.numberMovesPlayed == MAX_NUMBER_OF_MOVES else (current_player_move.numberMovesPlayed + 1)
            
            update_game_player_moves(update_game_player_moves)


            return "",200
        except Exception as err:
            print(err)
            return "Internal Server Error",500
            
    #@validate_gamepassCode
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
'''
current is 3 and movecomplete  -> next is 1 and waitingforplayertobeginmove,reassign playerId
current is x and movecomplete -> next is x+1 and waitingforplayertobeginmove,current playerId
current is x and WaitingForPlayerToBeginMove -> next is x and MoveInProgress
current is x and MoveInProgress -> next is x and MoveComplete
'''

def is_player_valid(playerId,current_player_move):
    return 