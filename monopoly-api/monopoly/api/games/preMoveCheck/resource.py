from flask import jsonify
from flask_restx import Resource,Namespace
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.gameCards.services import get_game_cards_owned_by_player,get_game_cards_in_play
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.api.gamePlayActions.services import get_game_play_actions
from monopoly.api.games.players.services import get_players_by_gameid
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException
from marshmallow import ValidationError
from .services import get_pre_move_check_list,get_game_cards_played_by_all_players
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
            
            current_player_cards = get_game_cards_owned_by_player(gameFound.gamePassCode,identity["playerId"])
            game_play_actions = get_game_play_actions()
            game_cards_in_play  = get_game_cards_in_play(gameFound.gamePassCode)
            players = get_players_by_gameid(gameFound.gameId)

            #grouped by playerId
            game_cards_played_by_all_players = get_game_cards_played_by_all_players(players,game_cards_in_play)

            pre_move_check_list = get_pre_move_check_list(current_player_cards,game_cards_played_by_all_players,game_play_actions)
            result = PreMoveCheckSchema(many=True).dump(pre_move_check_list)

            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)


