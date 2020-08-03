from monopoly import db
import monopoly.common.enums as Enum
import uuid



class PropertiesCard(db.Model):
    propertiesCardId = db.Column(db.Integer, primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
    primaryColourId = db.Column(db.Integer,db.Enum(Enum.Colours),nullable=False)
    secondaryColourId = db.Column(db.Integer,db.Enum(Enum.Colours),nullable=True)
    price= db.Column(db.Integer,nullable=False)


class PropertiesColor(db.Model):
    colorId = db.Column(db.Integer,db.Enum(Enum.Colours),nullable=False,primary_key=True)
    onePairRentPrice = db.Column(db.Integer,nullable=False)
    twoPairRentPrice = db.Column(db.Integer,nullable=False)
    threePairRentPrice = db.Column(db.Integer,nullable=False)
    fourPairRentPrice = db.Column(db.Integer,nullable=False)
    numberNeededToCompleteSet = db.Column(db.Integer,nullable=False)

class CashCard(db.Model):
    cashCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    price = db.Column(db.Integer,nullable=False)


class RentCard(db.Model):
    rentCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    primaryColourId = db.Column(db.Integer,db.Enum(Enum.Colours),nullable=False)
    secondaryColourId = db.Column(db.Integer,db.Enum(Enum.Colours),nullable=True)
    payee = db.Column(db.Integer,db.Enum(Enum.Payee),nullable=False)


class ActionCard(db.Model):
    actionCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
    price= db.Column(db.Integer,nullable=False)
    actionType = db.Column(db.Integer,db.Enum(Enum.ActionType),nullable=False)


class Player(db.Model):
    playerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    playerPassCode = db.Column(db.String,unique=True,nullable=False,default=uuid.uuid4())
    gameId = db.Column(db.String,db.ForeignKey("game.gameId"))
    playerName = db.Column(db.String)
    playerGameOrder = db.Column(db.Integer)
    game = db.relationship("game")

   
class Cards(db.Model):
    cardId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    cardType =  db.Column(db.Enum(Enum.CardTypes))
    propertiesCardId = db.Column(db.Integer,db.ForeignKey("properties_card.propertiesCardId"))
    cashCardId = db.Column(db.Integer,db.ForeignKey("cash_card.cashCardId"))
    rentId = db.Column(db.Integer,db.ForeignKey("rent_card.rentCardId"))
    actionId = db.Column(db.Integer,db.ForeignKey("action_card.actionCardId"))
    properties = db.relationship("properties_card")  
    cash = db.relationship("cash_card")  
    rent = db.relationship("rent_card")  
    action = db.relationship("action_card")  




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
    cardStatus = db.Column(db.Enum(Enum.GameCardStatus),nullable=False, default=Enum.GameCardStatus.IsNotDrawn)





class Game(db.Model):
    gameId = db.Column(db.String,primary_key=True, unique=True,nullable=False,default=uuid.uuid4())
    numberOfPlayers = db.Column(db.Integer,nullable=False,default=0)
    currentPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId"))
    numberOfTurnsPlayed = db.Column(db.Integer,nullable=False,default=0)
    gameStatus = db.Column(db.Enum(Enum.GameStatus),nullable=False, default=Enum.GameStatus.WaitingToStart)
    ownerPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId"))
    player =  db.relationship("player")