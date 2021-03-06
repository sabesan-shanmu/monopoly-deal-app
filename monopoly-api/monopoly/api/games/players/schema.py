from monopoly import ma
from marshmallow import fields,validate,post_load,post_dump
from monopoly.models import Player
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.common.enums import GameCardLocationStatus

class create_player_schema(ma.Schema):
    playerName = fields.String(required=True)
    playerPassCode = fields.String(required=True)
    imageId = fields.Integer(required=True)
    @post_load
    def make_player(self, data, **kwargs):
        return Player(**data)



class PlayerSchema(ma.Schema):
    playerId = fields.Integer()
    playerName = fields.String()
    playerGameOrder = fields.Integer()
    gamePassCode = fields.String()
    numberOfCardsOnHand = fields.Integer()
    imageId = fields.Integer(required=True)
    playerCards =fields.Nested(GameCardSchema,many=True)
    @post_dump
    def update_number_of_cards_on_hand(self, data, many, **kwargs):
        data["numberOfCardsOnHand"] = len([x for x in data["playerCards"] if x["cardStatus"]==GameCardLocationStatus.IsOnHand.value])
        del data['playerCards']
        return data


