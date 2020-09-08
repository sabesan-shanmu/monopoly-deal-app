from monopoly.models import Cards
from monopoly import db

def get_cards():
    return db.session.query(Cards).all()

def get_card(cardId):
    return db.session.query(Cards).filter_by(cardId=cardId).first()