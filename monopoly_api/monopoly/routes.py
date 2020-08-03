from monopoly import flask_api
from monopoly.api import gamesResource

flask_api.add_resource(gamesResource.MultipleGamesResource, '/games')
flask_api.add_resource(gamesResource.SingleGameResource, '/games/<int:gameId>')