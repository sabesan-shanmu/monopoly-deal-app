from monopoly import ma
from marshmallow import fields
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum

class SelectablePlayerSchema(ma.Schema):
    playerId = fields.Integer()
    description = fields.String()
    actionType = EnumField(Enum.ActionTypes,by_value=True)

class SelectableCardScehma(ma.Schema):
    gameCardId = fields.Integer()
    description = fields.String()
    actionType = EnumField(Enum.ActionTypes,by_value=True)

class InPlayMoveCheckSchema(ma.Schema):
    selectablePlayers = fields.Nested(SelectablePlayerSchema,many=True)
    selectableCards = fields.Nested(SelectableCardScehma,many=True)