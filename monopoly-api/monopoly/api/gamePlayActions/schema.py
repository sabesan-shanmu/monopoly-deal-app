from monopoly import ma
from marshmallow import fields
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum



class GamePlayActionSchema(ma.Schema):
    gamePlayActionId = fields.Integer(required=True)
    cardType = EnumField(Enum.CardTypes,by_value=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    expectedGameCardLocation = EnumField(Enum.GameCardLocationStatus,by_value=True)
    moveClassification = EnumField(Enum.ActionClassification,by_value=True)
    tradeTypes = EnumField(Enum.TradeTypes,by_value=True)
    links = ma.Hyperlinks(
        {"self": ma.AbsoluteUrlFor("GamePlayActions_single_game_play_action_resource", gamePlayActionId="<gamePlayActionId>")}
    )