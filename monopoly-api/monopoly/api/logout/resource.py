from flask_restx import Resource,Namespace
from flask import session,request,make_response,current_app as app
from monopoly.exceptions import FieldValidationException 

logout_namespace = Namespace('Logout', description='')


@logout_namespace.route('/')
class LogoutResource(Resource):

    def get(self):

        
        # The UI now keeps its own tokens, so there may be no cookie session to clear; logging out is still a success
        session.clear()
        response = make_response("Logged Out!",200)
        response.delete_cookie(app.config["SESSION_COOKIE_NAME"])
        return response