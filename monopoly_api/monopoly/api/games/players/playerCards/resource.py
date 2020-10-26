from flask import jsonify
from flask_restx import Resource
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.gameCards.services import get_game_cards_on_hand
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.api.games.services import get_game_by_gamepasscode

class ManyPlayerCardsResource(Resource):   
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,playerId):
        try:
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                return {"errors": "Game Not Found"}, 404
            playerCards = get_game_cards_on_hand(gameFound.gameId,playerId)
            result = GameCardSchema(many=True).dump(playerCards)
            return jsonify(result)
        except Exception as err:
            print(err)
            return "Internal Server Error",500

