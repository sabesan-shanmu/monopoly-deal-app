from flask import jsonify
from monopoly import flask_api
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from sqlalchemy.exc import DBAPIError,SQLAlchemyError,IntegrityError
from werkzeug.exceptions import InternalServerError,NotFound
from marshmallow.exceptions import ValidationError



MONOPOLY_ERRORS = {
    "EXPIRED_TOKEN_ERROR":{
        "statusCode": 401,
        "name":"ExpiredTokenError",
        "message":"Access Token has expired."
    },
    "INVALID_TOKEN_ERROR":{
        "statusCode": 401,
        "name":"InvalidTokenError",
        "message":"Invalid Token."
    },
    "MISSING_TOKEN_ERROR":{
        "statusCode": 401,
        "name":"MissingTokenError",
        "message":"Missing Token."
    },
    "MISSING_REFRESH_TOKEN_ERROR":{
        "statusCode": 401,
        "name":"RefreshTokenError",
        "message":"Fresh Token Required."
    },
    "REVOKED_TOKEN_ERROR":{
        "statusCode": 401,
        "name":"ExpiredTokenError",
        "message":"Token Has been revoked."
    },
    "CARD_NOT_FOUND_ERROR":{
        "statusCode": 404,
        "name":"GameCodeMismatchError",
        "message":"Game Code in Token does not match requested resource."
    },
    "GAME_CODE_MISMATCH_ERROR":{
        "statusCode": 400,
        "name":"GameCodeMismatchError",
        "message":"Game Code in Token does not match requested resource."
    },
    "PLAYER_ID_MISMATCH_ERROR":{
        "statusCode": 400,
        "name":"PlayerIdMismatchError",
        "message":"Player Id in Token does not match requested resource."
    },
    "RESOURCE_NOT_FOUND_ERROR":{
        "statusCode":404,
        "name":"NotFoundError",
        "message":"Request Resource is not found."
    },
    "VALIDATION_ERROR":{
        "statusCode": 404,
        "name":"ValidationError",
        "message":"Validation Error(s)"
    },
    "DB_INTEGRIY_ERROR":{
        "statusCode":500,
        "name":"DBIntegrityError",
        "message":"One or more of your data fields violates data integrity"
    },
    "DB_ERROR":{
        "statusCode":500,
        "name":"DatabaseError",
        "message":"An unexpected error has occured."
    },
    "DEFAULT": {
        "statusCode": 500,
        "name":"InternalServer",
        "message":"An unexpected error has occured."
    },
}

def get_formatted_error(errorType,**kwargs):
    error = MONOPOLY_ERRORS.get(errorType)
    msg = kwargs.get('message', None)
    error["message"] = msg if msg is not None else error["message"]
    return error,error.get("statusCode")

@flask_api.errorhandler(IntegrityError)
def database_integrity_error_handler(error):
    return get_formatted_error("DB_INTEGRIY_ERROR")

@flask_api.errorhandler(DBAPIError)
@flask_api.errorhandler(SQLAlchemyError)
def database_error_handler(error):
    return get_formatted_error("DB_ERROR")

@flask_api.errorhandler(InternalServerError)
@flask_api.errorhandler(ValueError)
@flask_api.errorhandler(AttributeError)
def internal_server_error_handler(error):
    return get_formatted_error("DEFAULT")


@flask_api.errorhandler(ResourceNotFoundException)
def bad_resource_error_handler(error):
    return get_formatted_error("RESOURCE_NOT_FOUND_ERROR",message=error.message)

@flask_api.app.errorhandler(NotFound)
def not_found_error_handler(error):
    return get_formatted_error("RESOURCE_NOT_FOUND_ERROR",message=error.description)

"""
TODO:Figure out why handler message wont override Validation Error exception message. ResourceValidationException and FieldValidationException are
workarounds. ideally it should be possible to use the default Marshmallow ValidationError exception
"""
@flask_api.errorhandler(ResourceValidationException)
def resource_validation_errror_handler(error):
    return get_formatted_error("VALIDATION_ERROR",message=([error.message] if isinstance(error.message, (str, bytes)) else error.message))

@flask_api.errorhandler(FieldValidationException)
def field_validation_exception(error):
    return get_formatted_error("VALIDATION_ERROR",message=error.message)

