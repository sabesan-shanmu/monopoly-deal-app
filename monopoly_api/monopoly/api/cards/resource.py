from flask_restx import Resource
from flask import jsonify
from .schema import CardSchema
from .services import get_card,get_cards

class ManyCardsResource(Resource):
    def get(self):
        cards = get_cards()
        result= CardSchema(many=True).dump(cards)
        return jsonify(result)

class SingleCardResource(Resource):
    def get(self,cardId):
        card = get_card(cardId)
        if card is None:
            return {"errors": "Card Not Found"}, 404
        else:    
            result = CardSchema().dump(card)
            return jsonify(result)
