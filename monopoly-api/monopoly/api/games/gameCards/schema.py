from monopoly import ma
from marshmallow import fields,post_dump
from marshmallow_enum import EnumField
from monopoly.api.cards.schema import CardSchema,PropertiesColourSchema
import monopoly.common.enums as Enum
from monopoly.common.utils import url_overwrite
from monopoly.models import GameCards

class GameCardSchema(ma.Schema):
    gameCardId = fields.Integer()
    name = fields.String()
    gamePassCode = fields.String()
    cardId = fields.Integer()
    playerId = fields.Integer()
    cardLocationStatus = EnumField(Enum.GameCardLocationStatus, by_value=True)
    isCardRightSideUp = fields.Boolean()
    card = fields.Nested(CardSchema)
    groupId = fields.String()
    assignedColourId= EnumField(Enum.Colours,by_value=True)
    assignedColourDetails = fields.Nested(PropertiesColourSchema)
    lastUpdated = fields.DateTime()
    links = ma.Hyperlinks(
        {"self": url_overwrite("GameCards_single_game_cards_resource", gamePassCode="<gamePassCode>", gameCardId="<gameCardId>")}
    )

class update_game_card_schema(ma.Schema):
    gameCardId = fields.Integer()
    playerId = fields.Integer(allow_none=True)
    cardLocationStatus = EnumField(Enum.GameCardLocationStatus, by_value=True)
    isCardRightSideUp = fields.Boolean()
    groupId = fields.String(allow_none=True)
    assignedColourId = EnumField(Enum.Colours, by_value=True,allow_none=True)
    

