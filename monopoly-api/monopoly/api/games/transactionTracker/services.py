from monopoly.models import TransactionTracker
from monopoly import db
from sqlalchemy import exc,and_


def get_transaction_trackers(gameId):
    return db.session.query(TransactionTracker).filter_by(gameId=gameId).all()

def get_transaction_tracker(transactionTrackerId):
    return db.session.query(TransactionTracker).filter_by(transactionTrackerId=transactionTrackerId).first()


def add_transaction_tracker(trackerTransaction):
    try:
        db.session.add(trackerTransaction)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise

def modify_transaction_tracker(trackerTransaction):
    try:
        transactionTrackerUpdate=get_transaction_tracker(trackerTransaction.transactionTrackerId)
        transactionTrackerUpdate.transactionTrackerStatus = trackerTransaction.transactionTrackerStatus
        transactionTrackerUpdate.requestedColourId = trackerTransaction.requestedColourId
        transactionTrackerUpdate.requestedTotal = trackerTransaction.requestedTotal
        transactionTrackerUpdate.requestedGroupId = trackerTransaction.requestedGroupId
        transactionTrackerUpdate.requestedGameCardId = trackerTransaction.requestedGameCardId 
        transactionTrackerUpdate.sendingGameCardId = trackerTransaction.sendingGameCardId
        db.session.commit()
        return transactionTrackerUpdate
    except:
        db.session.rollback()
        raise