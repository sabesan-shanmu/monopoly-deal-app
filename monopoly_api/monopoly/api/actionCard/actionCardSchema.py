from monopoly import ma
from marshmallow import fields
from marshmallow_enum import EnumField
from monopoly.common.enums as Enum


class ActionCardSchema(ma.Schema):
    actionCardId = fields.Integer(required=True)
    name = fields.String(required=True)
    price= fields.Integer(required=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    links = ma.HyperlinkRelated(
        {"self":ma.AbsoluteUrlFor("action_card_resource", actionCardId="<actionCardId>")}
    )