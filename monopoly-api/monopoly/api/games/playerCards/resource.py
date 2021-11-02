from flask import jsonify
from flask_restx import Resource,Namespace
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.gameCards.services import get_game_cards_on_hand
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity





player_cards_namespace = Namespace('PlayerCards', description='List of cards that a player is holding')


@player_cards_namespace.route('/')
class ManyPlayerCardsResource(Resource):   
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode):
        try:
            identity = get_jwt_identity()
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                raise ResourceNotFoundException(message="Game Not Found")
            playerCards = get_game_cards_on_hand(gameFound.gamePassCode,identity["playerId"])
            result = GameCardSchema(many=True).dump(playerCards)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)


