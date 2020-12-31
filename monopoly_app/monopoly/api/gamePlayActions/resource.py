from flask_restx import Resource
from flask import jsonify
from .schema import GamePlayActionSchema
from .services import get_game_play_actions,get_game_play_action
from flask_jwt_extended import jwt_required
from monopoly.auth import validate_gamepassCode
from monopoly.exceptions import ResourceNotFoundException


class ManyGamePlayActionsResource(Resource):
 
    @validate_gamepassCode
    def get(self):
        gamePlayActions = get_game_play_actions()
        result = GamePlayActionSchema(many=True).dump(gamePlayActions)
        return jsonify(result)

class SingleGamePlayActionResource(Resource):
   
    @validate_gamepassCode
    def get(self,gamePlayActionId):
        gamePlayAction = get_game_play_action(gamePlayActionId)
        if gamePlayAction is None:
            raise ResourceNotFoundException(message="Game Play Action Not Found")
        else:    
            result = GamePlayActionSchema().dump(gamePlayAction)
            return jsonify(result)


