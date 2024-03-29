from flask_restx import Resource,Namespace
from flask import request,jsonify,make_response
from .schema import GameSchema,create_game_schema,update_game_schema
from marshmallow import ValidationError
from .services import get_games,get_game_by_gamepasscode,create_game,delete_game,update_game_status,is_game_allowed_to_start
import monopoly.common.enums as Enum
import monopoly.common.constants as Constants
from monopoly.api.cards.services import get_cards
from monopoly.api.games.gameCards.services import create_game_cards
from monopoly.api.games.players.services import get_players_by_gameid,have_all_players_accepted
from sqlalchemy import exc
from monopoly.auth import validate_gamepassCode
from monopoly.api.games.gamePlayerMoves.services import create_game_player_moves
from monopoly.api.games.gamePlayerMoves.schema import GamePlayerMovesSchema
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from werkzeug.exceptions import BadRequest
from flask import session
import monopoly.notifications.games as gamesNotification
import monopoly.notifications.gameMoves as gameMovesNotification


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


                    if not have_all_players_accepted(players):
                        raise FieldValidationException(message="All Players have not clicked ready")

                    create_game_cards(gameFound,players,cards)

                    gamePlayerMoves=create_game_player_moves(gameFound)
                    created_game_moves_result = GamePlayerMovesSchema().dump(gamePlayerMoves)
                    
                    #publish created game move 
                    gameMovesNotification.publish_game_moves_create_event_to_room(gamePassCode,created_game_moves_result)
                    
                except ValidationError as e:
                    raise ResourceValidationException(e)
            
            gameFound = update_game_status(game)
            update_game_result = GameSchema().dump(gameFound)

            
            #publish game updates
            gamesNotification.publish_game_update_event_to_all(update_game_result)            
            gamesNotification.publish_game_update_event_to_room(gamePassCode,update_game_result)

           

            return jsonify(update_game_result)
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

            gamesNotification.publish_game_create_event_to_all(result)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)
       