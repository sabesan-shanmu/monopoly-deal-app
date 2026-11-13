import os
import sys
import tempfile

import pytest

# Configure before the app (and config.py) is imported. No Postgres or Redis needed:
# SQLite holds the schema and fakeredis backs the server-side session.
_db_file = os.path.join(tempfile.mkdtemp(prefix="monopoly-tests-"), "test.db")
os.environ.update({
    "FLASK_ENV": "production",
    "DATABASE_URL": "sqlite:///" + _db_file,
    "REDIS_URL": "redis://localhost:6379/0",
    "JWT_SECRET_KEY": "test-jwt-secret",
    "SECRET_KEY": "test-secret",
    "MONOPOLY_UI_URL": "https://ui.example.com",
})
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import fakeredis  # noqa: E402
from monopoly import create_app, db, socketio  # noqa: E402

UI_ORIGIN = {"Origin": "https://ui.example.com"}


@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.config["TESTING"] = True
    app.session_interface.redis = fakeredis.FakeStrictRedis()
    with app.app_context():
        db.create_all()
    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


def create_game(client, name):
    response = client.post("/api/games/", json={"name": name, "gameMode": 1}, headers=UI_ORIGIN)
    assert response.status_code == 200, response.get_json()
    return response.get_json()


def register(client, gamePassCode, playerName, imageId):
    response = client.post(
        "/api/games/{0}/register/".format(gamePassCode),
        json={"playerName": playerName, "playerPassCode": "pw1234", "imageId": imageId},
        headers=UI_ORIGIN,
    )
    assert response.status_code == 200, response.get_json()
    return response.get_json()


def bearer(tokens, kind="accessToken"):
    return {**UI_ORIGIN, "Authorization": "Bearer " + tokens[kind]}


@pytest.fixture()
def game_with_two_players(app):
    """A fresh game with a host (joined first) and a guest. Each registers from its own client."""
    import uuid
    setup = app.test_client()
    game = create_game(setup, "g-" + uuid.uuid4().hex[:12])
    host = register(app.test_client(), game["gamePassCode"], "host", 1)
    guest = register(app.test_client(), game["gamePassCode"], "guest", 2)
    return game, host, guest


@pytest.fixture()
def socket_client(app):
    clients = []

    def make():
        c = socketio.test_client(app)
        clients.append(c)
        return c

    yield make
    for c in clients:
        if c.is_connected():
            c.disconnect()
