from monopoly import flask_api
from monopoly.api.games.gamesResource import MultipleGamesResource,SingleGameResource
from monopoly.api.players.playersResource import ManyPlayersResource,VerifyUserResource

flask_api.add_resource(MultipleGamesResource, '/games/')
flask_api.add_resource(SingleGameResource, '/games/<string:gamePassCode>/')
flask_api.add_resource(ManyPlayersResource,'/games/<string:gamePassCode>/players')
flask_api.add_resource(VerifyUserResource,'/games/<string:gamePassCode>/login')
