
from flask_restx import Resource,Namespace
from flask import request,jsonify
from marshmallow import ValidationError
from monopoly.api.games.gameCards.services import draw_game_cards,update_game_cards
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from monopoly.common.constants import NUMBER_OF_CARDS_TO_DRAW


game_cards_namespace = Namespace('DrawCards', description='Draw 2 cards from deck')


@game_cards_namespace.route('/')
class DrawCardsResource(Resource):
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")    
            drawn_gameCards = draw_game_cards(game.gamePassCode,NUMBER_OF_CARDS_TO_DRAW)
            updated_gameCards = update_game_cards(draw_game_cards)     
            result = GameCardSchema(many=True).dump(updated_gameCards)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)