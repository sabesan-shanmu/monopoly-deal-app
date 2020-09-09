from flask_restx import Resource
from flask import request,jsonify   
from .schema import GameSchema,create_game_schema,update_game_schema
from marshmallow import ValidationError
from .services import get_games,get_game_by_gamepasscode,create_game,delete_game,update_game
import monopoly.common.enums as Enum
from monopoly.api.cards.services import get_cards
from monopoly.api.games.gameCards.services import create_game_cards
from monopoly.api.games.players.services import get_players_by_gameid
from sqlalchemy import exc

class SingleGameResource(Resource):

    def get(self,gamePassCode):
        game = get_game_by_gamepasscode(gamePassCode)
        if game is None:
            return {"errors": "Game Not Found"}, 404
        else:    
            result = GameSchema().dump(game)
            return jsonify(result)
   
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
                try:
                    cards = get_cards()
                    players = get_players_by_gameid(game.gameId)
                    create_game_cards(game.gameId,players,cards)
                except exc.IntegrityError as error:
                    return {"errors": error.orig.args}, 400
        
            gameFound = update_game(game)
            result = GameSchema().dump(gameFound)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400
        except:
            return {"errors": "Internal Server Error"}, 500

    def delete(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                return {"errors": "Game Not Found"}, 404
            else:
                delete_game(game)
                return {"message":"Game Deleted"}, 200
        except exc.IntegrityError as error:
            return {"errors": error.orig.args}, 400     
        except:
            return {"errors": "Internal Server Error"}, 500

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
        except exc.IntegrityError as error:
            return {"errors":error.orig.args}, 400
        except:
            return {"errors": "Internal Server Error"}, 500
 