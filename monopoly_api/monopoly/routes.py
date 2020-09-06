from monopoly import flask_api
from monopoly.api.games.gamesResource import MultipleGamesResource,SingleGameResource
om monopoly.api.games.players.playersResource import ManyPlayersResource,VerifyUserResource
from monopoly.api.cards.cardsResource import SingleCardResource,ManyCardsResource

flask_api.add_resource(MultipleGamesResource, '/games/')
flask_api.add_resource(SingleGameResource, '/games/<string:gamePassCode>/')
flask_api.add_resource(ManyPlayersResource,'/games/<string:gamePassCode>/players')
flask_api.add_resource(VerifyUserResource,'/games/<string:gamePassCode>/login')
flask_api.add_resource(ManyCardsResource,'/cards/')
flask_api.add_resource(SingleCardResource,'/cards/<int:cardId>/')
