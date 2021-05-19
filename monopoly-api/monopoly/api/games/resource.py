from flask_restx import Resource,Namespace
from flask import request,jsonify   
from .schema import GameSchema,create_game_schema,update_game_schema
from marshmallow import ValidationError
from .services import get_games,get_game_by_gamepasscode,create_game,delete_game,update_game,is_game_allowed_to_start
import monopoly.common.enums as Enum
import monopoly.common.constants as Constants
from monopoly.api.cards.services import get_cards
from monopoly.api.games.gameCards.services import create_game_cards
from monopoly.api.games.players.services import get_players_by_gameid
from sqlalchemy import exc
from monopoly.auth import validate_gamepassCode
from monopoly.api.games.players.gamePlayerMoves.services import create_game_player_moves
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from werkzeug.exceptions import BadRequest

game_namespace = Namespace('Games', description='List of games that a user can join. Users can also create/update game that they\'re part of')


@game_namespace.route('/<string:gamePassCode>/')
class SingleGameResource(Resource):   
    

    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")
            else: 
                result = GameSchema().dump(game)
                return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)

        
    @validate_gamepassCode
    def post(self,gamePassCode):
        try:
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                raise ResourceNotFoundException(message="Game Not Found")
             
            game = update_game_schema().load(request.get_json())
            if game.gamePassCode != gameFound.gamePassCode:
                raise FieldValidationException(message="GamePassCode in request body doesn't match url")
            elif game.gameStatus == Enum.GameStatus.WaitingToStart:
                raise FieldValidationException(message="Game cannot be reset to Waiting To Start.")
            elif gameFound.gameStatus == Enum.GameStatus.Completed:
                raise FieldValidationException(message="Game is complete.No longer can be updated.")

            if gameFound.gameStatus == Enum.GameStatus.WaitingToStart and game.gameStatus == Enum.GameStatus.InProgress:
                try:
                    cards = get_cards()
                    players = get_players_by_gameid(gameFound.gameId)

                    if not is_game_allowed_to_start(gameFound):
                        raise FieldValidationException(message="Not enough players to start the game")

                    create_game_cards(gameFound,players,cards)
                    create_game_player_moves(gameFound)
                    
                except ValidationError as e:
                    raise ResourceValidationException(e)
            
            gameFound = update_game(game)
            result = GameSchema().dump(gameFound)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)


    @validate_gamepassCode
    def delete(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")
            else:
                delete_game(game)
                result = GameSchema().dump(game)
                return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)

@game_namespace.route('/')
class MultipleGamesResource(Resource):

    def get(self):
        try:
            games = get_games()
            result= GameSchema(many=True).dump(games)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)

    def post(self): 
        try:
            game = create_game_schema().load(request.get_json()) 
            create_game(game)
            result = GameSchema().dump(game)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)