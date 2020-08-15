from flask_restx import Resource
from flask import jsonify
from monopoly.models import Card,PropertiesCard
from monopoly import db
from .propertiesCardSchema import PropertiesCardSchema


class PropertiesCardResource(Resource):
    def get(self,cardId,propertiesCardId):
        card = db.session.query(Card).filter_by(cardId=cardId).first()
            if card is None:
                return {"errors": "Card Not Found"}, 404
        propertiesCard = db.session.query(PropertiesCard).filter(propertiesCardId=propertiesCardId).first()
        if propertiesCard is None:
            return {"errors": "Properties Card Not Found"}, 404
        else:    
            result = PropertiesCardSchema().dump(propertiesCard)
            return jsonify(result)
