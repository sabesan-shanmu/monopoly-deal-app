from monopoly import ma
from marshmallow import fields,post_load
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.models import GameActionTracker


class GameActionTrackerSchema(ma.Schema):
    gameActionTrackerId = fields.Integer()
    gameId = fields.Integer()
    performedByPlayerId = fields.Integer()
    isGameActionCompleted = fields.Boolean()
    gamePlayActionId = fields.Integer()
    gameCardId = fields.Integer()
    



class create_game_action_tracker(ma.Schema):
    gameId = fields.Integer(required=True)
    performedByPlayerId = fields.Integer(required=True)


class update_game_action_tracker(ma.Schema):
    gameActionTrackerId = fields.Integer(required=True)
    gameId = fields.Integer(required=True)
    performedByPlayerId = fields.Integer(required=True)
    gamePlayActionId = fields.Integer(required=True)
    gameCardId = fields.Integer(required=True)