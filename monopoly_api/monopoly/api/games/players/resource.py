from flask_restx import Resource
from .schema import create_player_schema,PlayerSchema
from monopoly.common import constants,enums
from flask import request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from marshmallow import ValidationError
from sqlalchemy import and_,exc
from monopoly.api.games.services import get_game_by_gamepasscode
from .services import get_players_by_gameid,add_player,get_player
from monopoly.auth import create_tokens
from flask_jwt_extended  import jwt_refresh_token_required,get_jwt_identity

class RegisterResource(Resource):
    def post(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                return {"errors": "Game Not Found"}, 404

            #Get all current players that are part of the game
            players = get_players_by_gameid(game.gameId)
            if len(players)>=constants.MAX_NUMBER_OF_PLAYERS or game.gameStatus != enums.GameStatus.WaitingToStart:
                return {"errors": "No more players can join the game"}, 400
            #create the player
            player = create_player_schema().load(request.get_json())
            player.gameId = game.gameId 
            player.playerPassCode = generate_password_hash(player.playerPassCode)
            #evaluate their order based on other players' order
            player.playerGameOrder = 1 if len(players) == 0  else max(p.playerGameOrder for p in players)+1
            add_player(player)
            player_result = PlayerSchema().dump(player)
            result = create_tokens(player_result)
            return result,200

        except ValidationError as error:
            return {"errors": error.messages}, 400
        except exc.IntegrityError:
            return {"errors": "Player name already exists"}, 404

class LoginResource(Resource):
    def post(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                return {"errors": "Game Not Found"}, 404
            player = create_player_schema().load(request.get_json())
            playerFound = get_player(game.gameId,player)
            if playerFound is None:
                return {"errors": "Player Not Found"}, 404
            if check_password_hash(playerFound.playerPassCode,player.playerPassCode):
                player_result = PlayerSchema().dump(playerFound)
                result = create_tokens(player_result)
                return result, 200
            else:
                return {"errors": "Player Not Found"}, 404

        except ValidationError as error:
            return {'errror':error.message},400

class RefreshResource(Resource):
    @jwt_refresh_token_required
    def post(self,gamePassCode):
        current_user = get_jwt_identity()
        result = create_tokens(current_user)
        return result,200

