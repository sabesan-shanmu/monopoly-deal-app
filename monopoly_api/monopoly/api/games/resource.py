from flask_restx import Resource
from flask import request,jsonify   
from .schema import GameSchema,create_game_schema,update_game_schema
from marshmallow import ValidationError
from .services import get_games,get_game_by_gamepasscode,create_game,delete_game,update_game
import monopoly.common.enums as Enum
from monopoly.api.cards.services import get_cards
from monopoly.api.games.gameCards import create_game_cards
from monopoly.api.players import get_players_by_gameid

class SingleGameResource(Resource):
    def get(self,gamePassCode):
        game = get_game_by_gamepasscode(gamePassCode)
        if game is None:
            return {"errors": "Game Not Found"}, 404
        else:    
            result = GameSchema().dump(game)
            return jsonify(result)
    #1. start a game create the cards for everyone at this point update the currentPlayerId
    #2. start of a turn: set  numberOfTurnsPlayed=0
    #3. turn 1 set numberOfTurnsPlayed=1 only when there are no transactions remaining
    #4. turn 2 set numberOfTurnsPlayed=2 only when there are no transactions remaining
    #6. turn 3 set numberOfTurnsPlayed=0 set next playersTurn only when there are no transactions remaining
    #end Indirect change: set currentInPlayCardId
    def post(self,gamePassCode):
        try:
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                return {"errors": "Game Not Found"}, 404
             
            game = update_game_schema().load(request.get_json())
            if game.currentPlayerId != game.currentPlayerId and  gameFound.currentPlayerId is not None:
                raise ValidationError("Specified player is unable to update the game")
            elif game.gamePassCode != gameFound.gamePassCode:
                raise ValidationError("Request gamePassCode doesn't match url")
            elif game.gameStatus == Enum.GameStatus.WaitingToStart:
                raise ValidationError("Game cannot be rese to Waiting To Start.")

            if gameFound.gameStatus == Enum.GameStatus.WaitingToStart and game.gameStatus == Enum.GameStatus.InProgress:
                cards = get_cards()
                players = get_players_by_gameid(game.gameId)
                create_game_cards(game.gameId,players,cards)
                
            #update player turn
            elif game.gameStatus == Enum.GameStatus.Completed:
                #get current tranasctions and verify there are no active transactions
                #update player when its turn 3 
                #reset numberOfTurnsPlayed
                pass
            gameFound = update_game(game)
            result = GameSchema().dump(gameFound)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400

    def delete(self,gamePassCode):
        game = get_game_by_gamepasscode(gamePassCode)
        if game is None:
            return {"errors": "Game Not Found"}, 404
        else:
            delete_game(game)
            return {"message":"Game Deleted"}, 200

class MultipleGamesResource(Resource):
    def get(self):
        games = get_games()
        result= GameSchema(many=True).dump(games)
        return jsonify(result)
    def post(self):  
        try:
            game = create_game_schema().load(request.get_json()) 
            create_game(game)
            result = GameSchema().dump(game)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400
 