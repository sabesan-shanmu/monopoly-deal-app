from monopoly import ma
from marshmallow import fields
from marshmallow_enum import EnumField
from monopoly.common.enums as Enum


class PropertiesCardSchema(ma.Schema):
    propertiesCardId = fields.Integer(required=True)
    name = fields.String(required=True)
    price= fields.Integer(required=True)
    primaryColourId = EnumField(Enum.Colours,by_value=True)
    secondaryColourId = EnumField(Enum.Colours,by_value=True)
    links = ma.HyperlinkRelated(
        {"self":ma.AbsoluteUrlFor("properties_card_resource", propertiesCardId="<propertiesCardId>")}
    )