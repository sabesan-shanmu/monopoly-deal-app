from flask_restx import Resource,Namespace
from flask import request,jsonify   



class ManyTransactionTrackerResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode,transactionTrackerId):
        pass

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,transactionTrackerId):
        pass

class SingleTransactionTrackerResource(Resource):
    @validate_gamepassCode
    @validate_player
    def put(self,gamePassCode,transactionTrackerId,transactionTrackerId):
        pass

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,transactionTrackerId,transactionTrackerId):
        pass