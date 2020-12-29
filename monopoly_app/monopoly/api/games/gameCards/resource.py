
from flask_restx import Resource
from flask import request,jsonify
from marshmallow import ValidationError
from .services import get_game_cards_in_play
from monopoly.api.games.services import get_game_by_gamepasscode
from .schema import GameCardSchema
from monopoly.auth import validate_gamepassCode
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError

class GameCardsResource(Resource):
    @validate_gamepassCode
    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")    
            gameCards = get_game_cards_in_play(game.gameId)
            result = GameCardSchema(many=True).dump(gameCards)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)