from monopoly import ma
from marshmallow import fields,validate,post_load
from monopoly.models import Player

class create_player_schema(ma.Schema):
    playerName = fields.String(required=True)
    playerPassCode = fields.String(required=True)
    @post_load
    def make_player(self, data, **kwargs):
        return Player(**data)

class PlayerSchema(ma.Schema):
    playerName = fields.String()
    playerId = fields.Integer()
    playerGameOrder = fields.Integer()
    gameId = fields.Integer()