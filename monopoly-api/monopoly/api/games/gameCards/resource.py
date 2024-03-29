
from flask_restx import Resource,Namespace
from flask import request,jsonify
from marshmallow import ValidationError
from .services import get_game_cards_in_play,get_game_card_by_id,update_game_card
from monopoly.api.games.services import get_game_by_gamepasscode,update_game
from .schema import GameCardSchema,update_game_card_schema
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity
from monopoly.notifications.playerCards import publish_update_player_cards_on_hand_event_to_room,publish_delete_player_cards_on_hand_event_to_room
from monopoly.common.enums import GameCardLocationStatus,GameStatus
from monopoly.notifications.games import publish_game_update_event_to_room
from monopoly.api.games.schema import GameSchema
from monopoly.api.games.gamePlayerMoves.services import get_winner_id

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

            #publish event for player if card is no longer in hand
            if updated_game_card.playerId == identity["playerId"] and \
            updated_game_card.cardLocationStatus != GameCardLocationStatus.IsOnHand or updated_game_card.cardLocationStatus == GameCardLocationStatus.IsDiscarded:
                updated_gameCards_result = GameCardSchema(many=True).dump([new_game_card])
                publish_delete_player_cards_on_hand_event_to_room(gamePassCode,identity["playerId"],updated_gameCards_result)

            #check to see if theres a winner
            winner_found = get_winner_id(game)
            if winner_found:
                #update winner
                game.gameStatus=GameStatus.Completed
                game.gameWinnerId= winner_found.playerId
                update_game(game)
                
            #publish updated game
            updated_game = get_game_by_gamepasscode(gamePassCode)
            update_game_result = GameSchema().dump(updated_game)
            publish_game_update_event_to_room(gamePassCode,update_game_result)

            result = GameCardSchema().dump(new_game_card)
            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)
