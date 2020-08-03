from flask_restx import Resource
from flask import request,jsonify
from .gamesSchema import create_game_schema
from marshmallow import ValidationError
from monopoly import db
from monopoly.models import Game

class SingleGameResource(Resource):
    def get(self,gameId):
        pass
    def post(self,game):
        pass
    def delete(self,gameId):
        pass

class MultipleGamesResource(Resource):
    def post(self):  
        try:
            result = create_game_schema().load(request.get_json())
            game = Game(result)
            print(game)
        except ValidationError as error:
            return {"errors": error.messages}, 400