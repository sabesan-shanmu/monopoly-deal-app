from flask_restx import Resource
from flask import request,jsonify   
from .gamesSchema import GameSchema,create_game_schema,update_game_schema
from marshmallow import ValidationError
from monopoly import db
from monopoly.models import Game

class SingleGameResource(Resource):
    def get(self,gamePassCode):
        game = db.session.query(Game).filter_by(gamePassCode=gamePassCode).first()
        if game is None:
            return {"errors": "Game Not Found"}, 404
        else:    
            result = GameSchema().dump(game)
            return jsonify(result)
      
    def post(self,gamePassCode):
        try:
            gameFound = db.session.query(Game).filter_by(gamePassCode=gamePassCode).first()
            if gameFound is None:
                return {"errors": "Game Not Found"}, 404
             
            game = update_game_schema().load(request.get_json())
            if game.currentPlayerId != game.currentPlayerId and  gameFound.currentPlayerId is not None:
                raise ValidationError("Specified player is unable to update the game")
            elif game.gamePassCode != gameFound.gamePassCode:
                raise ValidationError("Request gamePassCode doesn't match url")
            #when numberofTurnsPlayed is sent as 3 update it to 0 and change it to next player
            #TODO:after completing player resource
            gameFound = game
            db.session.commit()
            result = GameSchema().dump(gameFound)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400

    def delete(self,gamePassCode):
        game = db.session.query(Game).filter_by(gamePassCode=gamePassCode).first()
        if game is None:
            return {"errors": "Game Not Found"}, 404
        else:
            db.session.delete(game)
            db.session.commit() 
            return {"message":"Game Deleted"}, 200

class MultipleGamesResource(Resource):
    def get(self):
        games = db.session.query(Game).all()
        result= GameSchema(many=True).dump(games)
        return jsonify(result)
    def post(self):  
        try:
            game = create_game_schema().load(request.get_json())
            
            db.session.add(game)
            db.session.commit()
            result = GameSchema().dump(game)
            return jsonify(result)
        except ValidationError as error:
            return {"errors": error.messages}, 400
 