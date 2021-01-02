from monopoly.models import GameActionTracker
from monopoly import db
from sqlalchemy import exc,and_


def get_game_action_trackers(gameId):
    return db.session.query(GameActionTracker).filter_by(gameId=gameId).all()

def get_game_action_tracker(gameId,gameTrackerActionId):
    return db.session.query(GameActionTracker).filter(and_(gameId=gameId,gameTrackerActionId=gameTrackerActionId)).first()


def create_game_action_tracker(gameTrackerAction):
    try:
        db.ession.add(gameTrackerAction)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise