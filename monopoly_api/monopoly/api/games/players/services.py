from monopoly.models import Player
from monopoly import db


def get_players_by_gameid(gameId):
    return db.session.query(Player).filter_by(gameId=gameId).all()


def add_player(player):
    db.session.add(player)
    db.session.commit()