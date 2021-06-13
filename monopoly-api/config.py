import os
from dotenv import load_dotenv
import datetime 
import redis


basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    API_VERSION = os.environ.get('API_VERSION')
    API_TITLE = os.environ.get('API_TITLE')
    API_DOC = os.environ.get('DOCUMENTATION')
    JWT_ACCESS_TOKEN_EXPIRES=datetime.timedelta(hours=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES')))
    JWT_REFRESH_TOKEN_EXPIRES=datetime.timedelta(hours=int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRES')))
    PROPAGATE_EXCEPTIONS = True
    ERROR_404_HELP = False
    SESSION_COOKIE_NAME = "MONOPOLY-DEAL"
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_TYPE = os.environ.get('SESSION_TYPE')
    SESSION_PERMANENT = False
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(hours = int(os.environ.get('PERMANENT_SESSION_LIFETIME')))


class ProductionConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URI')
    JWT_SECRET_KEY= os.environ.get("PROD_JWT_SECRET_KEY")
    SESSION_REDIS = redis.from_url(os.environ.get('PROD_REDISCLOUD_URL'))
    SECRET_KEY = os.environ.get("PROD_REDIS_SECRET_KEY")

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI')
    JWT_SECRET_KEY= os.environ.get("DEV_JWT_SECRET_KEY")
    SESSION_REDIS = redis.from_url(os.environ.get('DEV_REDISCLOUD_URL'))
    SECRET_KEY = os.environ.get("DEV_REDIS_SECRET_KEY")