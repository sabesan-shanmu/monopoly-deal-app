from monopoly import ma
from marshmallow import fields
from marshmallow_enum import EnumField
from monopoly.common.enums as Enum

class CardSchema(ma.Schema):
    cardId = fields.Integer(required=True)
    cardType = EnumField(Enum.CardTypes, by_value=True)
    propertiesCardId = fields.Integer()
    cashCardId = fields.Integer()
    rentId = fields.Integer()
    actionId = ields.Integer()