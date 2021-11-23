from monopoly.models import TransactionTracker
from monopoly import db
from sqlalchemy import exc,and_


def get_transaction_trackers(gameId):
    return db.session.query(TransactionTracker).filter_by(gameId=gameId).all()

def get_transaction_tracker(gameId,transactionTrackerId):
    return db.session.query(TransactionTracker).filter(and_(gameId=gameId,transactionTrackerId=transactionTrackerId)).first()


def add_transaction_tracker(trackerTransaction):
    try:
        db.session.add(trackerTransaction)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise