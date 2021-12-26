from monopoly import flask_api
from monopoly.api.logout.resource import logout_namespace
from monopoly.api.sessions.resource import session_namespace
from monopoly.api.games.resource import game_namespace
from monopoly.api.games.players.resource import players_namespace
from monopoly.api.games.playerCards.resource import player_cards_namespace
from monopoly.api.games.gamePlayerMoves.resource import game_player_moves_namespace
from monopoly.api.cards.resource import cards_namespace 
from monopoly.api.gamePlayActions.resource import game_play_action_namespace
from monopoly.api.games.gameCards.resource import game_cards_namespace
from monopoly.api.games.preMoveCheck.resource import pre_move_check_namespace
from monopoly.api.games.transactionTracker.resource import transaction_tracker_namespace
from monopoly.api.games.drawCards.resource import draw_cards_namespace
from monopoly.api.games.inPlayMoveCheck.resource import in_play_move_check_namespace
from monopoly.api.games.selectionMoveCheck.resource import selection_move_check_namespace
from monopoly.api.games.propertyMoveCheck.resource import property_move_check_namespace
from monopoly.api.games.transactionTracker.tradePayeeTransaction.resource import trade_payee_tracker_namespace

flask_api.add_namespace(session_namespace,'/api/sessions')
flask_api.add_namespace(logout_namespace,'/api/logout')
flask_api.add_namespace(game_namespace,'/api/games')
flask_api.add_namespace(players_namespace,'/api/games/<string:gamePassCode>')
flask_api.add_namespace(player_cards_namespace,'/api/games/<string:gamePassCode>/player-cards')
flask_api.add_namespace(game_player_moves_namespace,'/api/games/<string:gamePassCode>/game-player-moves')
flask_api.add_namespace(cards_namespace,'/api/cards')
flask_api.add_namespace(game_play_action_namespace,'/api/game-play-actions')
flask_api.add_namespace(game_cards_namespace,'/api/games/<string:gamePassCode>/game-cards')
flask_api.add_namespace(draw_cards_namespace,'/api/games/<string:gamePassCode>/draw-cards')
flask_api.add_namespace(pre_move_check_namespace,'/api/games/<string:gamePassCode>/pre-move-check')
flask_api.add_namespace(transaction_tracker_namespace,'/api/games/<string:gamePassCode>/game-action-trackers')
flask_api.add_namespace(in_play_move_check_namespace,'/api/games/<string:gamePassCode>/in-play-move-check')
flask_api.add_namespace(selection_move_check_namespace,'/api/games/<string:gamePassCode>/selection-move-check')
flask_api.add_namespace(property_move_check_namespace,'/api/games/<string:gamePassCode>/property-move-check')
flask_api.add_namespace(trade_payee_tracker_namespace,'/api/games/<string:gamePassCode>/game-action-trackers/<int:transactionTrackerId>/trade-payee-transaction')
