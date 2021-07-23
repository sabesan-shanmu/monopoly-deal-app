from monopoly import socketio

def publish_game_create_event(game):
    socketio.emit('create_game',game)

def publish_game_update_event(game):
    socketio.emit('update_game',game);
