from flask_restx import Resource


class ManyCardsResource(Resource):
    def get(self):
        pass

class SingleCardsResource(Resource):
    def get(self,cardId):
        pass