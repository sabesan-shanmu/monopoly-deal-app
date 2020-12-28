from flask_restx import Resource
from flask import jsonify
from .schema import CardSchema
from .services import get_card,get_cards
from flask_jwt_extended import jwt_required
from monopoly.auth import validate_gamepassCode
from monopoly.exceptions import BadResourceException

class ManyCardsResource(Resource):
 
    @validate_gamepassCode
    def get(self):
        cards = get_cards()
        result = CardSchema(many=True).dump(cards)
        return jsonify(result)

class SingleCardResource(Resource):
    
    @validate_gamepassCode
    def get(self,cardId):
        card = get_card(cardId)
        if card is None:
            raise BadResourceException(message="Card Not Found")
        else:    
            result = CardSchema().dump(card)
            return jsonify(result)
