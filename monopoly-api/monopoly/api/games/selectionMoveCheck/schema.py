from monopoly import ma
from marshmallow import fields,post_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.models import GamePlayerMoves
from monopoly.api.gamePlayActions.schema import GamePlayActionSchema


class SelectablePlayerSchema(ma.Schema):
    playerId = fields.Integer()
    description = fields.String()
    actionType = EnumField(Enum.ActionTypes,by_value=True)

class SelectableCardScehma(ma.Schema):
    gameCardId = fields.Integer()
    description = fields.String()
    actionType = EnumField(Enum.ActionTypes,by_value=True)

class SelectionMoveCheckSchema(ma.Schema):
    selectablePlayers = fields.Nested(SelectablePlayerSchema,many=True)
    selectableCards = fields.Nested(SelectableCardScehma,many=True)