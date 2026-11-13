import datetime
import threading
import time

from conftest import UI_ORIGIN, bearer, create_game, register
from monopoly.locks import serialize_game_writes


# --- Auth: the signed JWT is enough; no session cookie needed -----------------------------

def test_player_routes_work_without_cookie(app, game_with_two_players):
    game, host, _ = game_with_two_players
    fresh_client = app.test_client()  # sends no cookie, like a browser blocking third-party cookies
    response = fresh_client.get("/api/games/{0}/player-cards/".format(game["gamePassCode"]), headers=bearer(host))
    assert response.status_code == 200


def test_token_for_another_game_is_rejected(app, client, game_with_two_players):
    _, host, _ = game_with_two_players
    other = create_game(client, "other-game-auth")
    response = app.test_client().get("/api/games/{0}/player-cards/".format(other["gamePassCode"]), headers=bearer(host))
    assert response.status_code == 400
    assert response.get_json()["name"] == "GameCodeMismatchError"


def test_missing_token_is_401(client, game_with_two_players):
    game, _, _ = game_with_two_players
    response = client.get("/api/games/{0}/player-cards/".format(game["gamePassCode"]), headers=UI_ORIGIN)
    assert response.status_code == 401


def test_refresh_returns_new_tokens(app, game_with_two_players):
    game, host, _ = game_with_two_players
    response = app.test_client().post("/api/games/{0}/refresh/".format(game["gamePassCode"]), headers=bearer(host, "refreshToken"))
    assert response.status_code == 200
    assert set(response.get_json()) == {"accessToken", "refreshToken"}


def test_logout_succeeds_without_session(client):
    assert client.get("/api/logout/", headers=UI_ORIGIN).status_code == 200


# --- Deleting a game ---------------------------------------------------------------------

def test_only_host_can_delete_game(app, game_with_two_players):
    game, host, guest = game_with_two_players
    url = "/api/games/{0}/".format(game["gamePassCode"])

    by_guest = app.test_client().delete(url, headers=bearer(guest))
    assert by_guest.status_code == 403
    assert by_guest.get_json()["name"] == "ForbiddenError"

    by_host = app.test_client().delete(url, headers=bearer(host))
    assert by_host.status_code == 200
    assert app.test_client().get(url, headers=UI_ORIGIN).status_code == 404


# --- Error formatting --------------------------------------------------------------------

def test_custom_error_message_does_not_leak(app):
    from monopoly.errors import get_formatted_error, MONOPOLY_ERRORS  # registers handlers on import; needs the app
    with app.app_context():
        first, _ = get_formatted_error("RESOURCE_NOT_FOUND_ERROR", message="Game Not Found")
        second, _ = get_formatted_error("RESOURCE_NOT_FOUND_ERROR")
    assert first["message"] == "Game Not Found"
    assert second["message"] == MONOPOLY_ERRORS["RESOURCE_NOT_FOUND_ERROR"]["message"]
    assert MONOPOLY_ERRORS["RESOURCE_NOT_FOUND_ERROR"]["message"] == "Request Resource is not found."


def test_validation_errors_are_400(client):
    response = client.post("/api/games/", json={"name": "", "gameMode": 1}, headers=UI_ORIGIN)
    assert response.status_code == 400
    assert response.get_json()["name"] == "ValidationError"


# --- Links follow the request scheme -----------------------------------------------------

def test_links_use_https_behind_tls_proxy(client):
    game = create_game(client, "links-game")
    response = client.get("/api/games/{0}/".format(game["gamePassCode"]), headers={**UI_ORIGIN, "X-Forwarded-Proto": "https"})
    assert response.get_json()["links"]["self"].startswith("https://")


def test_links_use_http_locally(client):
    game = create_game(client, "links-game-local")
    response = client.get("/api/games/{0}/".format(game["gamePassCode"]), headers=UI_ORIGIN)
    assert response.get_json()["links"]["self"].startswith("http://localhost/")


# --- Timestamps --------------------------------------------------------------------------

def test_games_get_their_own_creation_time(client):
    first = create_game(client, "time-game-1")
    time.sleep(1.1)
    second = create_game(client, "time-game-2")
    assert first["createdUtcDate"] != second["createdUtcDate"]
    created = datetime.datetime.fromisoformat(second["createdUtcDate"])
    assert abs((datetime.datetime.utcnow() - created).total_seconds()) < 60


# --- Per-game write serialization --------------------------------------------------------

def test_writes_to_one_game_do_not_overlap():
    active, overlaps = {"count": 0}, []

    @serialize_game_writes
    def write(gamePassCode):
        active["count"] += 1
        if active["count"] > 1:
            overlaps.append(gamePassCode)
        time.sleep(0.05)
        active["count"] -= 1

    threads = [threading.Thread(target=write, kwargs={"gamePassCode": "same-game"}) for _ in range(5)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    assert overlaps == []


def test_writes_to_different_games_run_in_parallel():
    started = []
    release = threading.Event()

    @serialize_game_writes
    def write(gamePassCode):
        started.append(gamePassCode)
        release.wait(1)

    threads = [threading.Thread(target=write, kwargs={"gamePassCode": code}) for code in ("game-a", "game-b")]
    for t in threads:
        t.start()
    time.sleep(0.2)
    both_running = sorted(started) == ["game-a", "game-b"]
    release.set()
    for t in threads:
        t.join()
    assert both_running
