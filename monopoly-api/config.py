import os
from dotenv import load_dotenv
import datetime
import redis


basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


def _env(name, *fallbacks, default=None):
    """Read an env var, falling back to legacy names (e.g. PROD_/DEV_ prefixed ones)."""
    for key in (name, *fallbacks):
        value = os.environ.get(key)
        if value:
            return value
    return default


def _hours(name, default):
    return datetime.timedelta(hours=int(_env(name, default=default)))


def _database_url(*fallbacks):
    url = _env('DATABASE_URL', *fallbacks)
    # SQLAlchemy 1.3 only accepts the "postgresql://" scheme
    if url and url.startswith('postgres://'):
        url = url.replace('postgres://', 'postgresql://', 1)
    return url


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {'pool_pre_ping': True}
    API_VERSION = _env('API_VERSION', default='1.0')
    API_TITLE = _env('API_TITLE', default='Monopoly Deal API')
    API_DOC = _env('DOCUMENTATION', default='/documentation/')
    JWT_ACCESS_TOKEN_EXPIRES = _hours('JWT_ACCESS_TOKEN_EXPIRES', 1)
    JWT_REFRESH_TOKEN_EXPIRES = _hours('JWT_REFRESH_TOKEN_EXPIRES', 24)
    PROPAGATE_EXCEPTIONS = True
    ERROR_404_HELP = False
    SESSION_COOKIE_NAME = "MONOPOLY-DEAL"
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_TYPE = _env('SESSION_TYPE', default='redis')
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = _hours('PERMANENT_SESSION_LIFETIME', 24)


class ProductionConfig(Config):
    DEBUG = False

    def __init__(self):
        self.SQLALCHEMY_DATABASE_URI = _database_url('PROD_DATABASE_URI')
        self.JWT_SECRET_KEY = _env('JWT_SECRET_KEY', 'PROD_JWT_SECRET_KEY')
        self.SESSION_REDIS = redis.from_url(_env('REDIS_URL', 'PROD_REDISCLOUD_URL'))
        self.SECRET_KEY = _env('SECRET_KEY', 'PROD_REDIS_SECRET_KEY')
        self.MONOPOLY_UI_URL = _env('MONOPOLY_UI_URL', 'PROD_MONOPOLY_UI_URL')


class DevelopmentConfig(Config):
    DEBUG = True

    def __init__(self):
        self.SQLALCHEMY_DATABASE_URI = _database_url('DEV_DATABASE_URI')
        self.JWT_SECRET_KEY = _env('JWT_SECRET_KEY', 'DEV_JWT_SECRET_KEY')
        self.SESSION_REDIS = redis.from_url(_env('REDIS_URL', 'DEV_REDISCLOUD_URL', default='redis://localhost:6379'))
        self.SECRET_KEY = _env('SECRET_KEY', 'DEV_REDIS_SECRET_KEY')
        self.MONOPOLY_UI_URL = _env('MONOPOLY_UI_URL', 'DEV_MONOPOLY_UI_URL', default='http://localhost:3000')
