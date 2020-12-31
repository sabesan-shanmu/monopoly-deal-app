from monopoly import flask_api
from monopoly.api.games.resource import game_namespace
from monopoly.api.games.players.resource import players_namespace
from monopoly.api.games.players.playerCards.resource import player_cards_namespace
from monopoly.api.games.players.gamePlayerMoves.resource import game_player_moves_namespace
from monopoly.api.cards.resource import cards_namespace 
from monopoly.api.gamePlayActions.resource import game_play_action_namespace
from monopoly.api.games.gameCards.resource import game_cards_namespace

flask_api.add_namespace(game_namespace,'/api/games')
flask_api.add_namespace(players_namespace,'/api/games/<string:gamePassCode>')
flask_api.add_namespace(player_cards_namespace,'/api/games/<string:gamePassCode>/players/<int:playerId>/player-cards')
flask_api.add_namespace(game_player_moves_namespace,'/api/games/<string:gamePassCode>/players/<int:playerId>/game-player-moves')
flask_api.add_namespace(cards_namespace,'/api/cards')
flask_api.add_namespace(game_play_action_namespace,'/api/game-play-actions')
flask_api.add_namespace(game_cards_namespace,'/api/games/<string:gamePassCode>/gameCards')