from flask_restx import Resource,Namespace
from flask import request,jsonify   



class ManyTradePayeeTransactionResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode,transactionTrackerId):
        pass

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,transactionTrackerId):
        pass

class SingleTradePayeeTransactionResource(Resource):
    @validate_gamepassCode
    @validate_player
    def put(self,gamePassCode,transactionTrackerId,tradePayeeTransactionId):
        pass

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,transactionTrackerId,tradePayeeTransactionId):
        pass