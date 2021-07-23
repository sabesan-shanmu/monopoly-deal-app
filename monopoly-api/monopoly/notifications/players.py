from monopoly import socketio


def publish_player_create_event(player):
    socketio.emit('create_player',player);

def publish_player_update_event(player):
    socketio.emit('update_player',player);
