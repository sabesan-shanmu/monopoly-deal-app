from monopoly import ma
from marshmallow import fields,post_load
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.common.utils import url_overwrite
from monopoly.api.games.players.schema import PlayerSchema
from monopoly.models import TradePayeeTransaction


class TradePayeeTransactionSchema(ma.Schema):
    tradePayeeTransactionId = fields.Integer()
    gamePassCode = fields.String()
    transactionTrackerId = fields.Integer()
    targetPlayerId = fields.Integer()
    targetPlayer = fields.Nested(PlayerSchema)
    actionType = EnumField(Enum.ActionTypes,by_value=True)
    payeeTransactionStatus = EnumField(Enum.PayeeTransactionStatus,by_value=True)
    links = ma.Hyperlinks(
        {"self": url_overwrite("TransactionTracker_single_transaction_tracker_resource", gamePassCode="<gamePassCode>", transactionTrackerId="<transactionTrackerId>",tradePayeeTransactionId="<tradePayeeTransactionId>")}
    )

class create_trade_payee_transaction(ma.Schema):
    gamePassCode = fields.String()
    transactionTrackerId = fields.Integer(required=True)
    targetPlayerId = fields.Integer(required=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True,required=True)
    payeeTransactionStatus = EnumField(Enum.PayeeTransactionStatus,by_value=True)
    @post_load
    def make_trade_payee_transaction(self, data, **kwargs):
        return TradePayeeTransaction(**data)


class update_trade_payee_transaction(ma.Schema):
    tradePayeeTransactionId = fields.Integer(required=True)
    transactionTrackerId = fields.Integer(required=True)
    targetPlayerId = fields.Integer(required=True)
    actionType = EnumField(Enum.ActionTypes,by_value=True,required=True)
    payeeTransactionStatus = EnumField(Enum.PayeeTransactionStatus,by_value=True)
    @post_load
    def make_trade_payee_transaction(self, data, **kwargs):
        return TradePayeeTransaction(**data)

