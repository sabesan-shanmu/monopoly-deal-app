from monopoly import ma
from marshmallow import fields,post_dump
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.api.gamePlayActions.schema import GamePlayActionSchema

class PreMoveCheckSchema(ma.Schema):
    gameCardId = fields.Integer()
    possibleMoves = fields.Nested(GamePlayActionSchema,many=True)
 