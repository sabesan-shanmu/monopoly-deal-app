from monopoly import ma
from marshmallow import fields
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum

class GameCardSchema(ma.Schema):
    cardId = fields.Integer()
    playerId = fields.Integer()
    cardStatus = EnumField(Enum.GameCardStatus, by_value=True)
    isCardRightSideUp = fields.Boolean()