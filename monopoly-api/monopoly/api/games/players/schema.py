from monopoly import ma
from marshmallow import fields,validate,post_load,post_dump
from marshmallow.validate import Length
from monopoly.models import Player
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.common.enums import GameCardLocationStatus
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum

class register_player_schema(ma.Schema):
    playerName = fields.String(required=True,validate=Length(max=20,min=3))
    playerPassCode = fields.String(required=True,validate=Length(max=10,min=3))
    imageId = fields.Integer(required=True)
    @post_load
    def make_player(self, data, **kwargs):
        return Player(**data)

class login_player_schema(ma.Schema):
    playerName = fields.String(required=True,validate=Length(max=20,min=3))
    playerPassCode = fields.String(required=True,validate=Length(max=10,min=3))
    @post_load
    def make_player(self, data, **kwargs):
        return Player(**data)

class vote_player_schema(ma.Schema):
    voteStatusId = EnumField(Enum.VoteStatus, by_value=True,required=True)
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
    voteStatusId = EnumField(Enum.VoteStatus, by_value=True)
    playerCards = fields.Nested(GameCardSchema,many=True)
    @post_dump
    def update_number_of_cards_on_hand(self, data, many, **kwargs):
        data["numberOfCardsOnHand"] = len([x for x in data["playerCards"] if x["cardStatus"]==GameCardLocationStatus.IsOnHand.value])
        #only show cards that are in play
        data['playerCards'] = [x for x in data["playerCards"] if x["cardStatus"]!=GameCardLocationStatus.IsOnHand.value] 
        return data
    @post_load
    def make_player(self, data, **kwargs):
        return Player(**data)


