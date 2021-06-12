from flask_restx import Resource,Namespace


session_namespace = Namespace('Sessions', description='')


@session_namespace.route('/')
class SesssionResource(Resource):

    def post(self):
        return 200,"success"