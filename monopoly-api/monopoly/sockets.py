from flask import request
from flask_socketio import join_room,leave_room,rooms
from flask_jwt_extended import decode_token
from monopoly import socketio
from monopoly.notifications.playerCards import player_room

PLAYER_ROOM_PREFIX = "player_"


def _leave_player_rooms():
    for room in rooms():
        if room.startswith(PLAYER_ROOM_PREFIX):
            leave_room(room)


@socketio.on('join_player_room')
def join_player_room(data):
    """
    Subscribe this socket to its player's private hand events.
    The client sends its access token; the room comes from the verified token, never from the client.
    Returns an ack so the client can tell whether it joined.
    """
    token = (data or {}).get('accessToken') if isinstance(data, dict) else None
    if not token:
        return {'joined': False, 'error': 'Missing access token.'}
    try:
        decoded = decode_token(token)
    except Exception:
        return {'joined': False, 'error': 'Invalid or expired access token.'}

    identity = decoded.get('identity') or {}
    if decoded.get('type') != 'access' or identity.get('playerId') is None or not identity.get('gamePassCode'):
        return {'joined': False, 'error': 'Invalid access token.'}

    # One player per socket: a tab that logs in as someone else stops receiving the old hand
    _leave_player_rooms()
    join_room(player_room(identity['gamePassCode'], identity['playerId']))
    return {'joined': True}


@socketio.on('leave_player_room')
def leave_player_room_handler(data=None):
    _leave_player_rooms()
    return {'joined': False}
