from monopoly import db
import uuid
import enum



class GameStatus(enum.Enum):
    WaitingToStart = 0
    InProgress = 1
    Completed = 2


class Game(db.Model):
    gameId = db.Column(db.String,primary_key=True, unique=True,nullable=False,default=uuid.uuid4())
    numberOfPlayers = db.Column(db.Integer,nullable=False,default=0)
    currentPlayer = db.Column(db.Integer)
    numberOfTurnsPlayed = db.Column(db.Integer,nullable=False,default=0)
    gameStatus = db.Column(db.Enum(GameStatus),nullable=False, default=GameStatus.WaitingToStart)

