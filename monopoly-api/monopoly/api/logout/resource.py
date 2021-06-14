from flask_restx import Resource,Namespace
from flask import session,request,make_response,current_app as app
from monopoly.exceptions import FieldValidationException 

logout_namespace = Namespace('Logout', description='')


@logout_namespace.route('/')
class LogoutResource(Resource):

    def get(self):

        
        gameId = session.get("gameId")
        playerId = session.get("playerId")
        if gameId is None or playerId is None:
            raise FieldValidationException(message="No Session exists.")  

        session.clear()
        response = make_response("Logged Out!",200)
        response.delete_cookie(app.config["SESSION_COOKIE_NAME"])
        return response