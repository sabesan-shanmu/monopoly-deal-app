from flask import jsonify,request
from flask_jwt_extended import create_access_token,create_refresh_token,verify_jwt_in_request,get_jwt_identity
from functools import wraps


def create_tokens(player):
    result = {
        'accessToken':create_access_token(identity=player),
        'refreshToken': create_refresh_token(identity=player)
    }
    return result


def validate_gamepassCode(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        verify_jwt_in_request()
        identity = get_jwt_identity()
        expectedGamePassCode = identity.get("gamePassCode")        
        gamePassCode = kwargs.get("gamePassCode")
        if gamePassCode is not None and expectedGamePassCode != gamePassCode:
            return {"errors":"GamePassCode mismatch"},400

        return func(*args,**kwargs)
    return wrapper