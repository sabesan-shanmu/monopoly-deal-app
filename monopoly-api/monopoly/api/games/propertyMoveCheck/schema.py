from monopoly import ma
from marshmallow import fields,post_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum


class PropertyMoveCheckSchema(ma.Schema):
    gameCardId = fields.Integer()
    description = fields.String()
    isCardRightSideUp = fields.Boolean()
    groupId = fields.String()
    assignedColourId= EnumField(Enum.Colours,by_value=True)

