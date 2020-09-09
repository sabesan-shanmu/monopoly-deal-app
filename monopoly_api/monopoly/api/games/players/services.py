from monopoly.models import Player
from monopoly import db
from sqlalchemy import and_,exc

def get_players_by_gameid(gameId):
    return db.session.query(Player).filter_by(gameId=gameId).all()

def get_player(gameId,player):
    return db.session.query(Player).filter(and_(Player.playerName.ilike(player.playerName),Player.gameId==game.gameId)).first()
            

def add_player(player):
    try:
        db.session.add(player)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise