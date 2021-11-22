from monopoly import ma
from marshmallow import fields,pre_dump,post_load
from marshmallow_enum import EnumField
from monopoly.api.cards.schema import CardSchema
import monopoly.common.enums as Enum
from monopoly.common.utils import url_overwrite
from monopoly.models import GameCards

class GameCardSchema(ma.Schema):
    gameCardId = fields.Integer()
    name = fields.String()
    gamePassCode = fields.String()
    cardId = fields.Integer()
    playerId = fields.Integer()
    cardStatus = EnumField(Enum.GameCardLocationStatus, by_value=True)
    isCardRightSideUp = fields.Boolean()
    card = fields.Nested(CardSchema)
    setGroupId = fields.Integer()
    links = ma.Hyperlinks(
        {"self": url_overwrite("GameCards_single_game_cards_resource", gamePassCode="<gamePassCode>", gameCardId="<gameCardId>")}
    )

class update_game_card_schema(ma.Schema):
    gameCardId = fields.Integer()
    playerId = fields.Integer(allow_none=True)
    cardStatus = EnumField(Enum.GameCardLocationStatus, by_value=True)
    isCardRightSideUp = fields.Boolean()
    setGroupId = fields.Integer()
    
    def make_game_card(self, data, **kwargs):
        return GameCards(**data)

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