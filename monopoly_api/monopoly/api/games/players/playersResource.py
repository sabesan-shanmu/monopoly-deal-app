from flask_restx import Resource
from monopoly import db
from monopoly.models import Game,Player
from .playersSchema import create_player_schema,PlayerSchema
from monopoly.common import constants,enums
from flask import request,jsonify   
from werkzeug.security import generate_password_hash,check_password_hash
from marshmallow import ValidationError
from sqlalchemy import and_,exc

class ManyPlayersResource(Resource):
    def post(self,gamePassCode):
        try:
            game = db.session.query(Game).filter_by(gamePassCode=gamePassCode).first()
            if game is None:
                return {"errors": "Game Not Found"}, 404

            #Get all current players that are part of the game
            players = db.session.query(Player).filter_by(gameId=game.gameId).all()
            if len(players)>=constants.MAX_NUMBER_OF_PLAYERS or game.gameStatus != enums.GameStatus.WaitingToStart:
                return {"errors": "No more players can join the game"}, 400
            #create the player
            player = create_player_schema().load(request.get_json())
            player.gameId = game.gameId
            player.playerPassCode = generate_password_hash(player.playerPassCode)
            #evaluate their order based on other players' order
            player.playerGameOrder = 1 if len(players) == 0  else max(p.playerGameOrder for p in players)+1
            db.session.add(player)
            db.session.commit()
            # TODO: log the user in session 
            result = PlayerSchema().dump(player)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400
        except exc.IntegrityError:
            db.session.rollback()
            return {"errors": "Player name already exists"}, 404

class VerifyUserResource(Resource):
    def post(self,gamePassCode):
        try:
            game = db.session.query(Game).filter_by(gamePassCode=gamePassCode).first()
            if game is None:
                return {"errors": "Game Not Found"}, 404
            player = create_player_schema().load(request.get_json())
            playerFound = db.session.query(Player).filter(and_(Player.playerName.ilike(player.playerName),Player.gameId==game.gameId)).first()
            if playerFound is None:
                return {"errors": "Player Not Found"}, 404
            if check_password_hash(playerFound.playerPassCode,player.playerPassCode):
                #TODO: manage user session
                return {"message":'Logged in!'}, 200
            else:
                return {"errors": "Player Not Found"}, 404

        except ValidationError as error:
            return {'errror':error.message},400