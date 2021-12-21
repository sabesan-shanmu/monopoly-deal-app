from monopoly import ma
from marshmallow import fields,post_load
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.models import TransactionTracker
from monopoly.common.utils import url_overwrite
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.api.gamePlayActions.schema import GamePlayActionSchema


class TransactionTrackerSchema(ma.Schema):
    transactionTrackerId = fields.Integer()
    gamePassCode = fields.String()
    performedByPlayerId = fields.Integer()
    transactionTrackerStatus = EnumField(Enum.TransactionTrackerStatus,by_value=True)
    gamePlayActionId = fields.Integer()
    gamePlayAction = fields.Nested(GamePlayActionSchema)
    gameCardId = fields.Integer()
    gameCard = fields.Nested(GameCardSchema)
    links = ma.Hyperlinks(
        {"self": url_overwrite("TransactionTracker_single_transaction_tracker_resource", gamePassCode="<gamePassCode>", transactionTrackerId="<transactionTrackerId>")}
    )


class create_transaction_tracker(ma.Schema):
    gamePassCode = fields.String(required=True)
    performedByPlayerId = fields.Integer(required=True)
    gamePlayActionId = fields.Integer(required=True)
    gameCardId = fields.Integer(required=True)
    transactionTrackerStatus = EnumField(Enum.TransactionTrackerStatus,by_value=True,required=True)
    @post_load
    def make_game_action_tracker(self, data, **kwargs):
        return TransactionTracker(**data)


class updated_transaction_tracker(ma.Schema):
    transactionTrackerId = fields.Integer(required=True)
    transactionTrackerStatus = EnumField(Enum.TransactionTrackerStatus,by_value=True)
    @post_load
    def make_game_action_tracker(self, data, **kwargs):
        return TransactionTracker(**data)

