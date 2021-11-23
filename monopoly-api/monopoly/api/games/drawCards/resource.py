
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
from monopoly.api.games.gamePlayerMoves.services import get_game_player_moves, is_player_valid
from flask_jwt_extended.utils import get_jwt_identity
from monopoly.common.enums import GameMoveStatus,GameCardLocationStatus
from monopoly.notifications.playerCards import publish_add_player_cards_on_hand_event_to_room
from monopoly.notifications.games import publish_game_update_event_to_room
from monopoly.api.games.schema import GameSchema


draw_cards_namespace = Namespace('DrawCards', description='Draw 2 cards from deck')


@draw_cards_namespace.route('/')
class DrawCardsResource(Resource):
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode):
        try:
            identity = get_jwt_identity()
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")    
            
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise FieldValidationException(message="No Current Moves found")

            if not (is_player_valid(current_player_move,identity["playerId"])) or current_player_move.gameMoveStatus != GameMoveStatus.DrawTwoCardsInProgress:
                raise FieldValidationException(message="Player Not allowed to draw cards")
            

            drawn_gameCards = draw_game_cards(game.gamePassCode,NUMBER_OF_CARDS_TO_DRAW)
            #update drawn card to current player's id and location to on hand
            for i,drawn_card in enumerate(drawn_gameCards):
                drawn_gameCards[i].playerId = identity["playerId"]
                drawn_gameCards[i].cardLocationStatus = GameCardLocationStatus.IsOnHand
            updated_gameCards = update_game_cards(drawn_gameCards)     

            updated_gameCards_result = GameCardSchema(many=True).dump(updated_gameCards)


            #publish event for player who drew card
            publish_add_player_cards_on_hand_event_to_room(gamePassCode,identity["playerId"],updated_gameCards_result)

            #publish updated game
            update_game = get_game_by_gamepasscode(gamePassCode)
            update_game_result = GameSchema().dump(update_game)        
            publish_game_update_event_to_room(gamePassCode,update_game_result)

            return jsonify(updated_gameCards_result)
        except ValidationError as e:
            raise ResourceValidationException(e)