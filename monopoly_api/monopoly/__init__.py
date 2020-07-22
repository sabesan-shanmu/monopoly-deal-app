from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
ma = Marshmallow(app)

if app.config["ENV"] == "production":
    app.config.from_object('config.ProductionConfig')
else:
    app.config.from_object('config.DevelopmentConfig')

db = SQLAlchemy(app)

from monopoly import models


