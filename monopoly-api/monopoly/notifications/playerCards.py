from monopoly import socketio


def publish_add_player_cards_on_hand_event_to_room(gamePassCode,playerId,player_cards):
    socketio.emit("add_player_cards_on_hand_{0}_{1}".format(gamePassCode,playerId),player_cards)


def publish_update_player_cards_on_hand_event_to_room(gamePassCode,playerId,player_cards):
    socketio.emit("update_player_cards_on_hand_{0}_{1}".format(gamePassCode,playerId),player_cards)

def publish_delete_player_cards_on_hand_event_to_room(gamePassCode,playerId,player_cards):
    socketio.emit("delete_player_cards_on_hand_{0}_{1}".format(gamePassCode,playerId),player_cards)