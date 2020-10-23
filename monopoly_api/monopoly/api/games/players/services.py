from monopoly.models import Player
from monopoly import db
from sqlalchemy import and_,exc

def get_players_by_gameid(gameId):
    return db.session.query(Player).filter_by(gameId=gameId).all()

def get_player_by_player_name(gameId,playerName):
    return db.session.query(Player).filter(and_(Player.playerName.ilike(player.playerName),Player.gameId==gameId)).first()
            

def add_player(player):
    try:
        db.session.add(player)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise