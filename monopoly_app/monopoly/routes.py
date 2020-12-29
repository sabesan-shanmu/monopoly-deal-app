from monopoly import flask_api
from monopoly.api.games.resource import MultipleGamesResource,SingleGameResource
from monopoly.api.games.players.resource import RegisterResource,LoginResource,RefreshResource
from monopoly.api.games.players.playerCards.resource import ManyPlayerCardsResource
from monopoly.api.games.players.gamePlayerMoves.resource import GamePlayerMovesResource
from monopoly.api.cards.resource import SingleCardResource,ManyCardsResource
from monopoly.api.games.gameCards.resource import GameCardsResource
from monopoly.api.games.gameInPlayCard.resource import GameInPlayCardResource

flask_api.add_resource(MultipleGamesResource, '/api/games/')
flask_api.add_resource(SingleGameResource, '/api/games/<string:gamePassCode>/')
flask_api.add_resource(GameCardsResource,'/api/games/<string:gamePassCode>/gameCards/')
flask_api.add_resource(RegisterResource,'/api/games/<string:gamePassCode>/register/')
flask_api.add_resource(LoginResource,'/api/games/<string:gamePassCode>/login/')
flask_api.add_resource(RefreshResource,'/api/games/<string:gamePassCode>/refresh/')
flask_api.add_resource(GameInPlayCardResource,'/api/games/<string:gamePassCode>/gameInPlayCard/')

flask_api.add_resource(ManyPlayerCardsResource,'/api/games/<string:gamePassCode>/players/<int:playerId>/playerCards/')
flask_api.add_resource(GamePlayerMovesResource,'/api/games/<string:gamePassCode>/players/<int:playerId>/gameplayerMoves/')


flask_api.add_resource(ManyCardsResource,'/api/cards/')
flask_api.add_resource(SingleCardResource,'/api/cards/<int:cardId>/')
