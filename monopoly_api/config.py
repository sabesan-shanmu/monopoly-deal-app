import os
from dotenv import load_dotenv
import datetime


basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    API_VERSION = os.environ.get('API_VERSION')
    API_TITLE = os.environ.get('API_TITLE')
    JWT_ACCESS_TOKEN_EXPIRES=datetime.timedelta(seconds=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES')))
    JWT_REFRESH_TOKEN_EXPIRES=datetime.timedelta(seconds=int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRES')))

class ProductionConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URI')
    JWT_SECRET_KEY= os.environ.get("PROD_SECRET_KEY")

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI')
    JWT_SECRET_KEY= os.environ.get("DEV_SECRET_KEY")