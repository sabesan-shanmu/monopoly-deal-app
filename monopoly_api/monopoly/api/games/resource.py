from flask_restx import Resource
from flask import request,jsonify   
from .schema import GameSchema,create_game_schema,update_game_schema
from marshmallow import ValidationError
from .services import get_games,get_game_by_gamepasscode,create_game,delete_game,update_game
import monopoly.common.enums as Enum
import monopoly.common.constants as Constants
from monopoly.api.cards.services import get_cards
from monopoly.api.games.gameCards.services import create_game_cards
from monopoly.api.games.players.services import get_players_by_gameid
from sqlalchemy import exc
from monopoly.auth import validate_gamepassCode
from monopoly.api.games.players.gamePlayerMoves.services import create_game_player_moves
from monopoly.api.games.gameInPlayCard.services import create_game_in_play_card
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException


class SingleGameResource(Resource):   
    @validate_gamepassCode
    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                return {"errors": "Game Not Found"}, 404
            else:    
                result = GameSchema().dump(game)
                return jsonify(result)
        except Exception as error:
            return error.messages,400

        
    @validate_gamepassCode
    def post(self,gamePassCode):
        try:
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                return {"errors": "Game Not Found"}, 404
             
            game = update_game_schema().load(request.get_json())
            if game.gamePassCode != gameFound.gamePassCode:
                raise ValidationError("Request gamePassCode doesn't match url")
            elif game.gameStatus == Enum.GameStatus.WaitingToStart:
                raise ValidationError("Game cannot be reset to Waiting To Start.")
            elif gameFound.gameStatus == Enum.GameStatus.Completed:
                raise ValidationError("Game is complete.No longer can be updated.")

            if gameFound.gameStatus == Enum.GameStatus.WaitingToStart and game.gameStatus == Enum.GameStatus.InProgress:
                try:
                    cards = get_cards()
                    players = get_players_by_gameid(gameFound.gameId)
                    if len(players)< Constants.MIN_NUMBER_OF_PLAYERS:
                        raise ValidationError("Not enough players to start the game")

                    create_game_cards(gameFound,players,cards)
                    create_game_player_moves(gameFound)
                    create_game_in_play_card(gameFound)
                    
                except exc.IntegrityError as error:
                    return {"errors": error.orig.args}, 400
                except ValidationError as error:
                    return {"errors": error.messages}, 400
        
            gameFound = update_game(game)
            result = GameSchema().dump(gameFound)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400
        except:
            return {"errors": "Internal Server Error"}, 500


    @validate_gamepassCode
    def delete(self,gamePassCode):
        game = get_game_by_gamepasscode(gamePassCode)
        if game is None:
            raise ResourceNotFoundException(message="Game Not Found")
        else:
            delete_game(game)
            result = GameSchema().dump(game)
            return jsonify(result)

class MultipleGamesResource(Resource):

    def get(self):
        games = get_games()
        result= GameSchema(many=True).dump(games)
        return jsonify(result)

    def post(self):  
        game = create_game_schema().load(request.get_json()) 
        create_game(game)
        result = GameSchema().dump(game)
        return jsonify(result)
