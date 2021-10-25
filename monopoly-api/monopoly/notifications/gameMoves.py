from monopoly import socketio



def publish_game_update_event_to_room(gamePassCode,game_moves):
    socketio.emit('update_game_moves_'+gamePassCode,game_moves)


def publish_game_create_event_to_room(gamePassCode,game_moves):
    socketio.emit('create_game_moves_'+gamePassCode,game_moves)