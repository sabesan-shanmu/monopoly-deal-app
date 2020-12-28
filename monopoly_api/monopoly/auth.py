from flask import jsonify,request
from flask_jwt_extended import create_access_token,create_refresh_token,verify_jwt_in_request,get_jwt_identity
from functools import wraps
from monopoly import jwt
from monopoly.errors import getFormattedError

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
        expectedGamePassCode = identity.get("gamePassCode", None)    
        actualGamePassCode = kwargs.get("gamePassCode", None)
        if actualGamePassCode is not None and expectedGamePassCode != actualGamePassCode:
            return get_jwt_formatted_error("GAME_CODE_MISMATCH_ERROR")

        return func(*args,**kwargs)
    return wrapper


def validate_player(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        verify_jwt_in_request()
        identity = get_jwt_identity()
        expectedPlayerId = identity.get("playerId", None)        
        actualPlayerId = kwargs.get("playerId", None)
        if expectedPlayerId != actualPlayerId:
            return get_jwt_formatted_error("PLAYER_ID_MISMATCH_ERROR")

        return func(*args,**kwargs)
    return wrapper

@jwt.expired_token_loader
def jwt_expired_token_callback(expired_token):
    return get_jwt_formatted_error("EXPIRED_TOKEN_ERROR")

@jwt.invalid_token_loader
def jwt_invalid_token_loader_callback(msg):
    return get_jwt_formatted_error("INVALID_TOKEN_ERROR",msg=msg)

@jwt.needs_fresh_token_loader
def jwt_needs_fresh_token_callback():
    return get_jwt_formatted_error("MISSING_REFRESH_TOKEN_ERROR")

@jwt.revoked_token_loader
def jwt_revoked_token_callback():
    return get_jwt_formatted_error("REVOKED_TOKEN_ERROR")



def get_jwt_formatted_error(error,**kwargs):
    msg = kwargs.get('msg', None)
    response = getFormattedError(error,msg=msg)
    return jsonify(response), response.get("code")


