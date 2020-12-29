from monopoly import ma
from marshmallow import fields,pre_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.api.cards.schema import CardSchema

class GameInPlayCard(ma.Schema):
    currentInPlayCardId = fields.Integer()
    card = fields.Nested(CardSchema,many=True)


class update_game_in_play_card(ma.Schema):
    currentInPlayCardId = fields.Integer(required=True)
   