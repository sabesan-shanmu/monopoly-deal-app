from monopoly import ma
from marshmallow import fields,validate

class create_player_schema(ma.Schema):
    playerName = fields.String(required=True)
    playerPassCode = fields.String(required=True)

    
class PlayerSchema(ma.Schema):
    playerName = fields.String()
    playerId = fields.Integer()
    playerGameOrder = fields.Integer()
    gameId = fields.Integer()