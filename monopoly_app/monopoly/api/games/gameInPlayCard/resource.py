from flask_restx import Resource
from flask import jsonify,request
from .schema import CardSchema
from .services import get_game_in_play_card
from monopoly.auth import validate_gamepassCode
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException

class GameInPlayCardResource(Resource):
 
    @validate_gamepassCode
    def get(self,gamePassCode):
        game = get_game_by_gamepasscode(gamePassCode)
        if game is None:
            raise ResourceNotFoundException(message="Game Not Found")
        gameInPlayCard = get_game_in_play_card(game.gameId)
        result = GameInPlayCard().dump(gameInPlayCard)
        return jsonify(result)

