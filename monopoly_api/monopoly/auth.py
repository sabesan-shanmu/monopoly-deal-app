from flask import jsonify
from flask_jwt_extended import create_access_token,create_refresh_token



def create_tokens(player):
    result = {
        'accessToken':create_access_token(identity=player),
        'refreshToken': create_refresh_token(identity=player)
    }
    return result