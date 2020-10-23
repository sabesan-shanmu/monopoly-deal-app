from monopoly import ma
from marshmallow import fields,pre_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum

class GameCardSchema(ma.Schema):
    cardId = fields.Integer()
    playerId = fields.Integer()
    cardStatus = EnumField(Enum.GameCardStatus, by_value=True)
    isCardRightSideUp = fields.Boolean()
    links = ma.Hyperlinks(
        {"card": ma.AbsoluteUrlFor("single_card_resource", cardId="<cardId>")}
    )

class GameBoardSchema(ma.Schema):
    playerId = fields.Integer()
    cashPileCards = fields.Nested(GameCardSchema,many=True)
    propertyPileCards = fields.Nested(GameCardSchema,many=True)

    @pre_dump
    def remove_skip_values(self, data,**kwargs):
        return {
            key: value for key, value in data.items()
            if value is not None
        }