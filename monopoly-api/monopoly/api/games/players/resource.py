from flask_restx import Resource,Namespace
from .schema import PlayerSchema,login_player_schema,register_player_schema,vote_player_schema
from monopoly.common import constants,enums
from flask import request,jsonify,session
from werkzeug.security import generate_password_hash,check_password_hash
from monopoly.api.games.services import get_game_by_gamepasscode,is_player_allowed_to_join
from .services import get_players_by_gameid,add_player,update_player,get_player_by_player_name,get_player_by_player_id
from monopoly.auth import create_tokens,validate_gamepassCode,validate_player
from flask_jwt_extended  import jwt_refresh_token_required,get_jwt_identity
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
import monopoly.notifications.games as gamesNotification
from monopoly.api.games.schema import GameSchema
from collections import namedtuple



players_namespace = Namespace('Players', description='Players can sign up or login to existing game')


@players_namespace.route('/register/')
class RegisterResource(Resource):
    def post(self,gamePassCode):
        try:
            #Get game and all current players that are part of the game
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")    

            
            if not is_player_allowed_to_join(game):
                raise FieldValidationException(message="No more players can join the game")

            
            #create the player
            player = register_player_schema().load(request.get_json())
            player.gameId = game.gameId 
            player.gamePassCode = game.gamePassCode 
            player.playerPassCode = generate_password_hash(player.playerPassCode)
            #evaluate their order based on other players' order
            player.playerGameOrder = 1 if len(game.players) == 0  else max(p.playerGameOrder for p in game.players)+1

            #check if user name exists
            if len([x for x in game.players if x.playerName.lower() == player.playerName.lower()])>0:
                 raise FieldValidationException(message="Player Name already exists")  

            #check if imageId exists
            if len([x for x in game.players if x.imageId == player.imageId])>0:
                 raise FieldValidationException(message="Character Image already exists")  

            add_player(player)
          
            player_result = PlayerSchema().dump(player)
            
            session["gameId"] = game.gameId
            session["playerId"] = player_result["playerId"]
            
            #publish updated game
            update_game = get_game_by_gamepasscode(gamePassCode)
            update_game_result = GameSchema().dump(update_game)
            gamesNotification.publish_game_update_event_to_all(update_game_result)            
            gamesNotification.publish_game_update_event_to_room(update_game_result)

            result = create_tokens(player_result)
           
            return result,200
        except ValidationError as e:
            raise ResourceValidationException(e)

@players_namespace.route('/login/')
class LoginResource(Resource):
    def post(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")
            player = login_player_schema().load(request.get_json())
            playerFound = get_player_by_player_name(game.gameId,player.playerName)
            if playerFound is None:
                raise ResourceNotFoundException(message="Player Not Found")  

            if check_password_hash(playerFound.playerPassCode,player.playerPassCode):
                player_result = PlayerSchema().dump(playerFound)
                result = create_tokens(player_result)
                session["gameId"] = game.gameId
                session["playerId"] = player_result["playerId"]

                #publish updated game
                update_game = get_game_by_gamepasscode(gamePassCode)
                update_game_result = GameSchema().dump(update_game)
                gamesNotification.publish_game_update_event_to_all(update_game_result)
                gamesNotification.publish_game_update_event_to_room(update_game_result)

                return result, 200  
            else:
                raise ResourceNotFoundException(message="Incorrect Password")  

        except ValidationError as e:
            raise ResourceValidationException(e)

@players_namespace.route('/refresh/')
class RefreshResource(Resource):
    @jwt_refresh_token_required
    def post(self,gamePassCode):
        current_user = get_jwt_identity()
        result = create_tokens(current_user)
        return result,200


@players_namespace.route('/vote/')
class VoteResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode):
        try:
            current_user = get_jwt_identity()
            player_vote = vote_player_schema().load(request.get_json());
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")
            
            playerFound = get_player_by_player_id(game.gameId,current_user["playerId"])
            if playerFound is None:
                raise ResourceNotFoundException(message="Player Not Found")  

            playerFound.voteStatusId = player_vote.voteStatusId
            update_player(playerFound)
            
            player_result = PlayerSchema().dump(playerFound)

            #publish updated game
            update_game = get_game_by_gamepasscode(gamePassCode)
            update_game_result = GameSchema().dump(update_game)
            gamesNotification.publish_game_update_event_to_all(update_game_result)
            gamesNotification.publish_game_update_event_to_room(update_game_result)


            
            result = create_tokens(player_result)
            return result,200

        except ValidationError as e:
            raise ResourceValidationException(e)

