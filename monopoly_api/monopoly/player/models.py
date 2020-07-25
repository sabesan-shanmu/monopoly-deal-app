from monopoly import db
import uuid

class Player(db.Model):
    playerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    playerPassCode = db.Column(db.String,unique=True,nullable=False,default=uuid.uuid4())
    gameId = db.Column(db.String,db.ForeignKey("game.gameId"))
    playerName = db.Column(db.String)
    playerGameOrder = db.Column(db.Integer)
    game = db.relationship("game")
