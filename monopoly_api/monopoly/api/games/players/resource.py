from flask_restx import Resource
from .schema import create_player_schema,PlayerSchema
from monopoly.common import constants,enums
from flask import request,jsonify   
from werkzeug.security import generate_password_hash,check_password_hash
from marshmallow import ValidationError
from sqlalchemy import and_,exc
from monopoly.api.games.services import get_game_by_gamepasscode
from .services import get_players_by_gameid,add_player,get_player
from monopoly import db

class ManyPlayersResource(Resource):
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
            result = PlayerSchema().dump(player)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400
        except exc.IntegrityError:
            return {"errors": "Player name already exists"}, 404

class VerifyUserResource(Resource):
    def post(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                return {"errors": "Game Not Found"}, 404
            player = create_player_schema().load(request.get_json())
            playerFound = get_player(player,game.gameId)
            if playerFound is None:
                return {"errors": "Player Not Found"}, 404
            if check_password_hash(playerFound.playerPassCode,player.playerPassCode):
                #TODO: manage user session
                return {"message":'Logged in!'}, 200
            else:
                return {"errors": "Player Not Found"}, 404

        except ValidationError as error:
            return {'errror':error.message},400