from monopoly import flask_api
from monopoly.api.games.resource import MultipleGamesResource,SingleGameResource
from monopoly.api.games.players.resource import RegisterResource,LoginResource,RefreshResource
from monopoly.api.cards.resource import SingleCardResource,ManyCardsResource
from monopoly.api.games.gameCards.resource import GameCardsResource

flask_api.add_resource(MultipleGamesResource, '/games/')
flask_api.add_resource(SingleGameResource, '/games/<string:gamePassCode>/')

flask_api.add_resource(RegisterResource,'/games/<string:gamePassCode>/register')
flask_api.add_resource(LoginResource,'/games/<string:gamePassCode>/login')
flask_api.add_resource(RefreshResource,'/games/<string:gamePassCode>/refresh')


flask_api.add_resource(GameCardsResource,'/games/<string:gamePassCode>/gameCards')

flask_api.add_resource(ManyCardsResource,'/cards/')
flask_api.add_resource(SingleCardResource,'/cards/<int:cardId>/')
