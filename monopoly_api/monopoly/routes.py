from monopoly import flask_api
from monopoly.api.games.gamesResource import MultipleGamesResource,SingleGameResource
from monopoly.api.players.playersResource import PlayersResource,VerifyUserResource

flask_api.add_resource(MultipleGamesResource, '/games/')
flask_api.add_resource(SingleGameResource, '/games/<string:gamePassCode>/')
flask_api.add_resource(playersResource.PlayersResource,'/games/<int:gamePassCode>/players')
flask_api.add_resource(playersResource.VerifyUserResource,'/games/<int:gamePassCode>/login')