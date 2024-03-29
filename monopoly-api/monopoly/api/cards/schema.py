from monopoly import ma
from marshmallow import fields,post_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.common.utils import url_overwrite
from flask import current_app

class PropertiesColourSchema(ma.Schema):
    colourId = EnumField(Enum.Colours,by_value=True)
    onePairRentPrice = fields.Integer()
    twoPairRentPrice = fields.Integer()
    threePairRentPrice = fields.Integer()
    fourPairRentPrice = fields.Integer()
    numberNeededToCompleteSet = fields.Integer()




class ActionCardSchema(ma.Schema):
    name = fields.String(required=True)
    price= fields.Integer(required=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    transactionCost = fields.Integer()

class CashCardSchema(ma.Schema):
    name = fields.String(required=True)
    price = fields.Integer(required=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    

class RentCardSchema(ma.Schema):
    name = fields.String(required=True)
    primaryColourId = EnumField(Enum.Colours,by_value=True)
    secondaryColourId = EnumField(Enum.Colours,by_value=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    price = fields.Integer(required=True)
    primaryColourDetails = fields.Nested(PropertiesColourSchema)
    secondaryColourDetails = fields.Nested(PropertiesColourSchema)


class PropertiesCardSchema(ma.Schema):
    name = fields.String(required=True)
    primaryColourId = EnumField(Enum.Colours,by_value=True)
    secondaryColourId = EnumField(Enum.Colours,by_value=True)
    price = fields.Integer(required=True)
    primaryColourDetails = fields.Nested(PropertiesColourSchema)
    secondaryColourDetails = fields.Nested(PropertiesColourSchema)
    isRotatable = fields.Boolean()
    actionType = EnumField(Enum.ActionTypes,by_value=True)

class CardSchema(ma.Schema):
    cardId = fields.Integer(required=True)
    cardType = EnumField(Enum.CardTypes, by_value=True)
    cardImageUrl = fields.String(required=True)
    name = fields.String(required=True)
    price = fields.Integer(required=True)
    action = fields.Nested(ActionCardSchema)
    properties = fields.Nested(PropertiesCardSchema)
    rent = fields.Nested(RentCardSchema)
    cash = fields.Nested(CashCardSchema)
    links = ma.Hyperlinks(
        {"self": url_overwrite("Cards_single_card_resource", cardId="<cardId>")}
    )
    # Remove None fields
    @post_dump
    def remove_skip_values(self, data,**kwargs):
        return {
            key: value for key, value in data.items()
            if value is not None
        }
