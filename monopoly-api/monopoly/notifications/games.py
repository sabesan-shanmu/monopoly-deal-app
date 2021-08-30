from monopoly import socketio

def publish_game_create_event_to_all(game):
    socketio.emit('create_game',game)

def publish_game_update_event_to_all(game):
    socketio.emit('update_game',game)


def publish_game_update_event_to_room(game):
    socketio.send(game, to=game["gamePassCode"])