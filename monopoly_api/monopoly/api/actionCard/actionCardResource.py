from flask_restx import Resource
from flask import jsonify
from monopoly.models import Card,ActionCard
from monopoly import db
from .actionCardSchema import ActionCardSchema


class ActionCardResource(Resource):
    def get(self,cardId,actionCardId):
        card = db.session.query(Card).filter_by(cardId=cardId).first()
            if card is None:
                return {"errors": "Card Not Found"}, 404
        actionCard = db.session.query(ActionCard).filter(actionCardId=actionCardId).first()
        if actionCard is None:
            return {"errors": "Action Card Not Found"}, 404
        else:    
            result = ActionCardSchema().dump(actionCard)
            return jsonify(result)
