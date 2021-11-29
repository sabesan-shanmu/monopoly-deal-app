from monopoly import ma
from marshmallow import fields
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.common.utils import url_overwrite


class GamePlayActionSchema(ma.Schema):
    gamePlayActionId = fields.Integer(required=True)
    cardType = EnumField(Enum.CardTypes,by_value=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    expectedGameCardLocation = EnumField(Enum.GameCardLocationStatus,by_value=True)
    description = fields.String(required=True)
    links = ma.Hyperlinks(
        {"self": url_overwrite("GamePlayActions_single_game_play_action_resource", gamePlayActionId="<gamePlayActionId>")}
    )