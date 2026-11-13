from monopoly import socketio


def player_room(gamePassCode,playerId):
    """Private Socket.IO room for one player's hand. Only sockets that proved they hold that player's JWT join it."""
    return "player_{0}_{1}".format(gamePassCode,playerId)


def publish_add_player_cards_on_hand_event_to_room(gamePassCode,playerId,player_cards):
    socketio.emit("add_player_cards_on_hand_{0}_{1}".format(gamePassCode,playerId),player_cards,to=player_room(gamePassCode,playerId))


def publish_update_player_cards_on_hand_event_to_room(gamePassCode,playerId,player_cards):
    socketio.emit("update_player_cards_on_hand_{0}_{1}".format(gamePassCode,playerId),player_cards,to=player_room(gamePassCode,playerId))

def publish_delete_player_cards_on_hand_event_to_room(gamePassCode,playerId,player_cards):
    socketio.emit("delete_player_cards_on_hand_{0}_{1}".format(gamePassCode,playerId),player_cards,to=player_room(gamePassCode,playerId))
