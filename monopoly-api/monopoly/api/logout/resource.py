from flask_restx import Resource,Namespace


logout_namespace = Namespace('Logout', description='')


@logout_namespace.route('/')
class LogoutResource(Resource):

    def get(self):
        return 200,"success"