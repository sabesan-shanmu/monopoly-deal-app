import datetime

import pytest
from flask_jwt_extended import create_access_token, create_refresh_token

from monopoly.notifications.playerCards import (
    publish_add_player_cards_on_hand_event_to_room,
    publish_update_player_cards_on_hand_event_to_room,
)
from monopoly.notifications.games import publish_game_update_event_to_room

CODE = "game-rooms"


@pytest.fixture()
def tokens(app):
    with app.app_context():
        return {
            "alice": create_access_token(identity={"playerId": 1, "gamePassCode": CODE}),
            "bob": create_access_token(identity={"playerId": 2, "gamePassCode": CODE}),
            "expired": create_access_token(identity={"playerId": 1, "gamePassCode": CODE},
                                           expires_delta=datetime.timedelta(seconds=-60)),
            "refresh": create_refresh_token(identity={"playerId": 1, "gamePassCode": CODE}),
        }


def join(client, token):
    return client.emit("join_player_room", {"accessToken": token} if token else {}, callback=True)


def received(client):
    return [event["name"] for event in client.get_received()]


def publish_hands(app):
    with app.test_request_context():
        publish_add_player_cards_on_hand_event_to_room(CODE, 1, [{"card": "alice"}])
        publish_update_player_cards_on_hand_event_to_room(CODE, 2, [{"card": "bob"}])


def test_valid_access_tokens_join(socket_client, tokens):
    assert join(socket_client(), tokens["alice"]) == {"joined": True}


@pytest.mark.parametrize("token_key", ["forged", "expired", "refresh", None])
def test_bad_tokens_are_refused(socket_client, tokens, token_key):
    token = tokens["alice"][:-4] + "AAAA" if token_key == "forged" else tokens.get(token_key)
    assert join(socket_client(), token)["joined"] is False


def test_hand_events_only_reach_their_player(app, socket_client, tokens):
    alice, bob, watcher = socket_client(), socket_client(), socket_client()
    join(alice, tokens["alice"])
    join(bob, tokens["bob"])
    for c in (alice, bob, watcher):
        c.get_received()

    publish_hands(app)

    assert received(alice) == ["add_player_cards_on_hand_{0}_1".format(CODE)]
    assert received(bob) == ["update_player_cards_on_hand_{0}_2".format(CODE)]
    assert received(watcher) == []


def test_public_game_events_still_reach_everyone(app, socket_client):
    watcher = socket_client()
    watcher.get_received()
    with app.test_request_context():
        publish_game_update_event_to_room(CODE, {"public": True})
    assert received(watcher) == ["update_game_{0}".format(CODE)]


def test_leaving_stops_hand_events(app, socket_client, tokens):
    alice = socket_client()
    join(alice, tokens["alice"])
    alice.emit("leave_player_room", callback=True)
    alice.get_received()
    publish_hands(app)
    assert received(alice) == []


def test_switching_player_on_one_socket_drops_the_old_hand(app, socket_client, tokens):
    tab = socket_client()
    join(tab, tokens["alice"])
    join(tab, tokens["bob"])
    tab.get_received()
    publish_hands(app)
    assert received(tab) == ["update_player_cards_on_hand_{0}_2".format(CODE)]
