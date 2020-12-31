from monopoly import flask_api
from monopoly.api.games.resource import MultipleGamesResource,SingleGameResource
from monopoly.api.games.players.resource import RegisterResource,LoginResource,RefreshResource
from monopoly.api.games.players.playerCards.resource import ManyPlayerCardsResource
from monopoly.api.games.players.gamePlayerMoves.resource import GamePlayerMovesResource
from monopoly.api.cards.resource import SingleCardResource,ManyCardsResource
from monopoly.api.gamePlayActions.resource import ManyGamePlayActionsResource,SingleGamePlayActionResource
from monopoly.api.games.gameCards.resource import GameCardsResource

flask_api.add_resource(MultipleGamesResource, '/api/games/')
flask_api.add_resource(SingleGameResource, '/api/games/<string:gamePassCode>/')
flask_api.add_resource(GameCardsResource,'/api/games/<string:gamePassCode>/gameCards/')
flask_api.add_resource(RegisterResource,'/api/games/<string:gamePassCode>/register/')
flask_api.add_resource(LoginResource,'/api/games/<string:gamePassCode>/login/')
flask_api.add_resource(RefreshResource,'/api/games/<string:gamePassCode>/refresh/')

flask_api.add_resource(ManyPlayerCardsResource,'/api/games/<string:gamePassCode>/players/<int:playerId>/player-cards/')
flask_api.add_resource(GamePlayerMovesResource,'/api/games/<string:gamePassCode>/players/<int:playerId>/game-player-moves/')


flask_api.add_resource(ManyCardsResource,'/api/cards/')
flask_api.add_resource(SingleCardResource,'/api/cards/<int:cardId>/')


flask_api.add_resource(ManyGamePlayActionsResource,'/api/game-play-actions/')
flask_api.add_resource(SingleGamePlayActionResource,'/api/game-play-actions/<int:gamePlayActionId>/')