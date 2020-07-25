from monopoly import db
import uuid
import enum


class GameCardStatus(enum.Enum):
    IsNotDrawn = 0
    IsOnHand = 1
    IsPlayedOnField = 2
    IsDiscarded = 3


class GameCards(db.Model):
    __table_args__ = (
        db.PrimaryKeyConstraint('gameId', 'cardId'),
    )
    gameId = db.Column(db.String,db.ForeignKey("game.gameId"))
    cardId = db.Column(db.Integer,db.ForeignKey("cards.cardId"))
    playerId = db.Column(db.Integer,db.ForeignKey("player.playerId"))
    game = db.relationship("game")
    player = db.relationship("player")
    card = db.relationship("cards")
    cardStatus = db.Column(db.Enum(GameCardStatus),nullable=False, default=GameCardStatus.IsNotDrawn)
