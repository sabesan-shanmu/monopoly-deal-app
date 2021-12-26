from monopoly.models import TradePayeeTransaction
from monopoly import db
from sqlalchemy import exc,and_


def get_trade_payee_transaction_trackers(transactionTrackerId):
    return db.session.query(TradePayeeTransaction).filter_by(transactionTrackerId=transactionTrackerId).all()

def get_trade_payee_transaction_tracker(tradePayeeTransactionId):
    return db.session.query(TradePayeeTransaction).filter_by(tradePayeeTransactionId=tradePayeeTransactionId).first()


def save_trade_payee_transactions(tradePayeeTransactions):
    try:
        db.session.add_all(tradePayeeTransactions)
        db.session.commit()
        return tradePayeeTransactions
    except:
        db.session.rollback()
        raise

