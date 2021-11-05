from monopoly import socketio



def publish_game_moves_update_event_to_room(gamePassCode,game_moves):
    socketio.emit("update_game_moves_{0}".format(gamePassCode),game_moves)


def publish_game_moves_create_event_to_room(gamePassCode,game_moves):
    socketio.emit("create_game_moves_{0}".format(gamePassCode),game_moves)