from flask import jsonify
from flask_restx import Resource,Namespace
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.gameCards.services import get_game_cards_on_hand,get_game_cards_in_play
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.api.gamePlayActions.services import get_game_play_actions
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException
from marshmallow import ValidationError
from .services import get_pre_move_check_list
from .schema import PreMoveCheckSchema
from flask_jwt_extended import get_jwt_identity

pre_move_check_namespace = Namespace('PreMoveCheck', description='Resource to check which cards are playable based on cards on hand')


@pre_move_check_namespace.route('/')
class PreMoveCheckResource(Resource):   
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode):
        try:
            identity = get_jwt_identity()
            gameFound = get_game_by_gamepasscode(gamePassCode)
            if gameFound is None:
                raise ResourceNotFoundException(message="Game Not Found")
            
            player_cards_on_hand = get_game_cards_on_hand(gameFound.gamePassCode,identity["playerId"])
            game_play_actions = get_game_play_actions()
            game_cards_in_play  = get_game_cards_in_play(gameFound.gamePassCode)

            pre_move_check_list = get_pre_move_check_list(player_cards_on_hand,game_cards_in_play,game_play_actions)
            result = PreMoveCheckSchema(many=True).dump(pre_move_check_list)

            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)


