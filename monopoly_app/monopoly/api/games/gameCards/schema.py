from monopoly import ma
from marshmallow import fields,pre_dump
from marshmallow_enum import EnumField
from monopoly.api.cards.schema import CardSchema
import monopoly.common.enums as Enum

class GameCardSchema(ma.Schema):
    gameCardId = fields.Integer()
    gameId = fields.Integer()
    cardId = fields.Integer()
    playerId = fields.Integer()
    cardStatus = EnumField(Enum.GameCardLocationStatus, by_value=True)
    isCardRightSideUp = fields.Boolean()
    card = fields.Nested(CardSchema)

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