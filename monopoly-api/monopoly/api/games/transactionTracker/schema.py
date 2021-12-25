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
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    transactionTrackerStatus = EnumField(Enum.TransactionTrackerStatus,by_value=True)
    gamePlayActionId = fields.Integer()
    gamePlayAction = fields.Nested(GamePlayActionSchema)
    gameCardId = fields.Integer()
    gameCard = fields.Nested(GameCardSchema) 
    requestedTotal = fields.Integer() #rent, its my birthday, debt collector
    requestedRentColourId = EnumField(Enum.Colours,by_value=True)#rent
    requestedGroupId = fields.String() #dealbreaker
    requestedGameCardId = fields.Integer() #sly deal,force deal
    sendingGameCardId = fields.Integer() #force deal

    links = ma.Hyperlinks(
        {"self": url_overwrite("TransactionTracker_single_transaction_tracker_resource", gamePassCode="<gamePassCode>", transactionTrackerId="<transactionTrackerId>")}
    )


class create_transaction_tracker(ma.Schema):
    gamePassCode = fields.String(required=True)
    performedByPlayerId = fields.Integer(required=True)
    gamePlayActionId = fields.Integer(required=True)
    gameCardId = fields.Integer(required=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True,required=True)
    transactionTrackerStatus = EnumField(Enum.TransactionTrackerStatus,by_value=True,required=True)
    @post_load
    def make_game_action_tracker(self, data, **kwargs):
        return TransactionTracker(**data)


class updated_transaction_tracker(ma.Schema):
    transactionTrackerId = fields.Integer(required=True)
    transactionTrackerStatus = EnumField(Enum.TransactionTrackerStatus,by_value=True)
    requestedTotal = fields.Integer(allow_none=True) #rent, its my birthday, debt collector
    requestedRentColourId = EnumField(Enum.Colours,by_value=True,allow_none=True)#rent
    requestedGroupId = fields.String(allow_none=True) #dealbreaker
    requestedGameCardId = fields.Integer(allow_none=True) #sly deal,force deal
    sendingGameCardId = fields.Integer(allow_none=True) #force deal
    @post_load
    def make_game_action_tracker(self, data, **kwargs):
        return TransactionTracker(**data)

