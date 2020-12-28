from flask import Flask
from flask_restx import Resource,Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager


db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
flask_api = Api()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    if app.config["ENV"] == "production":
        app.config.from_object('config.ProductionConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')
    
    db.init_app(app)
    migrate.init_app(app,db)
    ma.init_app(app)
    jwt.init_app(app)
    
    flask_api.version = app.config['API_TITLE']
    flask_api.version = app.config['API_VERSION']
    flask_api.init_app(app)

    
  
    from . import routes
    from . import models


    return app


