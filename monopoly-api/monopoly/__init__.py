from flask import Flask,render_template,request
import flask.scaffold
flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
from flask_restx import Resource,Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from monopoly.middleware import Middleware
from flask_cors import CORS
from flask_session import Session
from flask_socketio import SocketIO
from werkzeug.middleware.proxy_fix import ProxyFix

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
flask_api = Api()
jwt = JWTManager()
session = Session()
cors = CORS()
socketio = SocketIO()

def create_app():
    app = Flask(__name__,template_folder="static")

    from config import ProductionConfig,DevelopmentConfig
    if app.config["ENV"] == "production":
        app.config.from_object(ProductionConfig())
    else:
        app.config.from_object(DevelopmentConfig())
    
    db.init_app(app)
    migrate.init_app(app,db)
    ma.init_app(app)
    jwt.init_app(app)
    # Render terminates TLS at its proxy; trust its X-Forwarded-Proto so absolute links come out https
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1)
    app.wsgi_app = Middleware(app.wsgi_app)
    cors.init_app(app,origins=[app.config['MONOPOLY_UI_URL']])
    session.init_app(app)
    socketio.init_app(app,cors_allowed_origins=app.config['MONOPOLY_UI_URL'])
    
    
    flask_api.title = app.config['API_TITLE']
    flask_api.version = app.config['API_VERSION']
    flask_api._doc = app.config['API_DOC']
    flask_api.init_app(app)
    
  
    from . import namespaces
    from . import models
    from . import sockets


    return app


