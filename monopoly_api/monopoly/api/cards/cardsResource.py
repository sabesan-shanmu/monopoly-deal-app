from flask_restx import Resource
from flask import jsonifygi
from monopoly.models import Cards
from monopoly import db
from .cardsSchema import CardSchema

class ManyCardsResource(Resource):
    def get(self):
        cards = db.session.query(Cards).all()
        result= CardSchema(many=True).dump(cards)
        return jsonify(result)

class SingleCardsResource(Resource):
    def get(self,cardId):
        card = db.session.query(Cards).filter(cardId=cardId).first()
        if card is None:
            return {"errors": "Card Not Found"}, 404
        else:    
            result = CardSchema().dump(card)
            return jsonify(result)
