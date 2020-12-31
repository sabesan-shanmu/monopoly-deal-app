from monopoly.models import GamePlayAction
from monopoly import db

def get_game_play_actions():
    return db.session.query(GamePlayAction).all()



def get_game_play_action(gamePlayActionId):
     return db.session.query(GamePlayAction).filter_by(gamePlayActionId=gamePlayActionId).first()