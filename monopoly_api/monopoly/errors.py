from flask import jsonify
from monopoly import flask_api
from sqlalchemy.exc import DBAPIError
from werkzeug.exceptions import HTTPException



MONOPOLY_ERRORS = {
    "EXPIRED_TOKEN_ERROR":{
        "code": 401,
        "name":"ExpiredTokenError",
        "message":"Access Token has expired."
    },
    "INVALID_TOKEN_ERROR":{
        "code": 401,
        "name":"InvalidTokenError",
        "message":"Invalid Token."
    },
    "MISSING_REFRESH_TOKEN_ERROR":{
        "code": 401,
        "name":"RefreshTokenError",
        "message":"Fresh Token Required."
    },
    "REVOKED_TOKEN_ERROR":{
        "code": 401,
        "name":"ExpiredTokenError",
        "message":"Token Has been revoked."
    },
    "CARD_NOT_FOUND_ERROR":{
        "code": 400,
        "name":"GameCodeMismatchError",
        "message":"Game Code in Token does not match requested resource."
    },
    "GAME_CODE_MISMATCH_ERROR":{
        "code": 400,
        "name":"GameCodeMismatchError",
        "message":"Game Code in Token does not match requested resource."
    },
    "PLAYER_ID_MISMATCH_ERROR":{
        "code": 400,
        "name":"PlayerIdMismatchError",
        "message":"Player Id in Token does not match requested resource."
    },
    "DB_ERROR":{
        "code":500,
        "name":"DatabaseError",
        "message":"An unexpected error has occured."
    },
    "DEFAULT": {
        "code": 500,
        "name":"InternalServer",
        "message":"An unexpected error has occured."
    },
}

def getFormattedError(errorType,**kwargs):
    error = MONOPOLY_ERRORS.get(errorType)
    msg = kwargs.get('message', None)
    error["message"] = msg if msg is not None else error["message"]
    return error



@flask_api.errorhandler(DBAPIError)
def database_error_handler(error):
    return getFormattedError("DB_ERROR")





