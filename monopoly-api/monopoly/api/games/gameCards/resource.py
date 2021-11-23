
from flask_restx import Resource,Namespace
from flask import request,jsonify
from marshmallow import ValidationError
from .services import get_game_cards_in_play,get_game_card_by_id,update_game_card
from monopoly.api.games.services import get_game_by_gamepasscode
from .schema import GameCardSchema,update_game_card_schema
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity
from monopoly.notifications.playerCards import publish_update_player_cards_on_hand_event_to_room
from monopoly.common.enums import GameCardLocationStatus


game_cards_namespace = Namespace('GameCards', description='Game cards that are in play on the board')


@game_cards_namespace.route('/')
class ManyGameCardsResource(Resource):
    @validate_gamepassCode
    def get(self,gamePassCode):
        try:
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")    
            gameCards = get_game_cards_in_play(game.gamePassCode)
            result = GameCardSchema(many=True).dump(gameCards)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)
    
@game_cards_namespace.route('/<int:gameCardId>/')
class SingleGameCardsResource(Resource):
    @validate_gamepassCode
    @validate_player
    def patch(self,gamePassCode,gameCardId):
        try:    
            identity = get_jwt_identity()
            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")    
            
            updated_game_card = get_game_card_by_id(gameCardId)
            game_card = update_game_card_schema().load(request.get_json())
            for column in updated_game_card.__table__.columns._data.keys():
                
                if column in game_card:
                    setattr(updated_game_card, column,game_card[column])

            new_game_card = update_game_card(updated_game_card)

            #publish event for player if card is on hand
            if updated_game_card.playerId == identity["playerId"] and \
            updated_game_card.cardLocationStatus == GameCardLocationStatus.IsOnHand:
                updated_gameCards_result = GameCardSchema(many=True).dump([new_game_card])
                publish_update_player_cards_on_hand_event_to_room(gamePassCode,identity["playerId"],updated_gameCards_result)


            result = GameCardSchema().dump(new_game_card)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)