from flask import jsonify
from flask_restx import Resource,Namespace
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.gameCards.services import get_game_cards_on_hand
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.api.gamePlayActions.services import get_game_play_actions
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from .services import get_playable_cards



pre_move_check_namespace = Namespace('Pre-Move Check', description='Resource to check which cards are playable based on cards on hand')


@pre_move_check_namespace.route('/')
class PreMoveCheck(Resource):   
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,playerId):
        try:
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                raise ResourceNotFoundException(message="Game Not Found")
            
            player_cards_on_hand = get_game_cards_on_hand(gameFound.gameId,playerId)
            game_play_actions = get_game_play_actions()
            
            playable_cards = get_playable_cards(player_cards_on_hand,game_play_actions)


            result = GameCardSchema(many=True).dump(playable_cards)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)


