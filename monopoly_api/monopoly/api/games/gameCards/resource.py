
from flask_restx import Resource
from flask import request,jsonify
from marshmallow import ValidationError
from sqlalchemy import and_,exc
from monopoly.api.games.services import get_game_by_gamepasscode
from .services import get_game_cards_in_play
from monopoly.api.games.services import get_game_by_gamepasscode
from .schema import GameCardSchema
from monopoly.auth import validate_gamepassCode

class GameCardsResource(Resource):
    @validate_gamepassCode
    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                return {"errors": "Game Not Found"}, 404        
            gameCards = get_game_cards_in_play(game.gameId)
            result = GameCardSchema(many=True).dump(gameCards)
            return jsonify(result)
        except Exception as err:
            print(err)
            return "Internal Server Error",500