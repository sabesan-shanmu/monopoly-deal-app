from flask_restx import Resource,Namespace
from flask import session,request,make_response
from monopoly.exceptions import FieldValidationException,ResourceNotFoundException
from monopoly.api.games.players.services import get_player_by_player_id
from monopoly.api.games.players.schema import PlayerSchema 
from monopoly.auth import create_tokens

session_namespace = Namespace('Sessions', description='')


@session_namespace.route('/')
class SesssionResource(Resource):

    def get(self):

        gameId = session.get("gameId")
        playerId = session.get("playerId")
        if gameId is None or playerId is None:
            raise FieldValidationException(message="No Session exists.")      
        
        playerFound = get_player_by_player_id(gameId,playerId)
        if playerFound is None:
            raise ResourceNotFoundException(message="Player Not Found")  
        
        player_result = PlayerSchema().dump(playerFound)
        result = create_tokens(player_result)
        
        return make_response(result,200)

       