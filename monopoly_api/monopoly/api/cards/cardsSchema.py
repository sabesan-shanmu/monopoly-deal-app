from monopoly import ma
from marshmallow import fields,post_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum

class CardSchema(ma.Schema):
    cardId = fields.Integer(required=True)
    cardType = EnumField(Enum.CardTypes, by_value=True)
    cardImagedUrl = fields.String(required=True)
    propertiesCardId = fields.Integer()
    cashCardId = fields.Integer()
    rentCardId = fields.Integer()
    actionCardId = fields.Integer()
    links = ma.HyperlinkRelated(
        {"self":ma.AbsoluteUrlFor("single_card_resource", gamePassCode="<cardId>")}
    )

    @post_dump
    def post_process(self,card):
        if card["propertiesCardId"] is not None:
            card["links"].append({"propertiesCard":ma.AbsoluteUrlFor("single_properties_card_resource", gamePassCode="<propertiesCardId>")})
        if card["cashCardId"] is not None:
            card["links"].append({"cashCard":ma.AbsoluteUrlFor("single_cash_card_resource", gamePassCode="<cashCardId>")})
        if card["rentCardId"] is not None:
            card["links"].append({"rentCard":ma.AbsoluteUrlFor("single_rent_card_resource", gamePassCode="<rentCardId>")})
        if card["actionCardId"] is not None:
            card["links"].append({"actionCard":ma.AbsoluteUrlFor("single_action_card_resource", gamePassCode="<actionCardId>")})
        return card
