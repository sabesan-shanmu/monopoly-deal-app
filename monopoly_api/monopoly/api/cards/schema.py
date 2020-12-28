from monopoly import ma
from marshmallow import fields,post_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum


class ActionCardSchema(ma.Schema):
    name = fields.String(required=True)
    price= fields.Integer(required=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True)

class CashCardSchema(ma.Schema):
    price = fields.Integer(required=True)

class RentCardSchema(ma.Schema):
    primaryColourId = EnumField(Enum.Colours,by_value=True)
    secondaryColourId = EnumField(Enum.Colours,by_value=True)
    payee = EnumField(Enum.Payee,by_value=True)
    price = fields.Integer(required=True)


class PropertiesCardSchema(ma.Schema):
    name = fields.String(required=True)
    primaryColourId = EnumField(Enum.Colours,by_value=True)
    secondaryColourId = EnumField(Enum.Colours,by_value=True)
    price = fields.Integer(required=True)


class CardSchema(ma.Schema):
    cardId = fields.Integer(required=True)
    cardType = EnumField(Enum.CardTypes, by_value=True)
    action = fields.Nested(ActionCardSchema)
    properties = fields.Nested(PropertiesCardSchema)
    rent = fields.Nested(RentCardSchema)
    cash = fields.Nested(CashCardSchema)
    links = ma.Hyperlinks(
        {"self": ma.AbsoluteUrlFor("single_card_resource", cardId="<cardId>")}
    )
    # Remove None fields
    @post_dump
    def remove_skip_values(self, data,**kwargs):
        return {
            key: value for key, value in data.items()
            if value is not None
        }
