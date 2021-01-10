from monopoly import db
import monopoly.common.enums as Enum
import uuid
from datetime import datetime
from sqlalchemy import UniqueConstraint


class PropertiesColour(db.Model):
    colourId = db.Column(db.Enum(Enum.Colours),nullable=False,primary_key=True)
    onePairRentPrice = db.Column(db.Integer,nullable=True)
    twoPairRentPrice = db.Column(db.Integer,nullable=True)
    threePairRentPrice = db.Column(db.Integer,nullable=True)
    fourPairRentPrice = db.Column(db.Integer,nullable=True)
    numberNeededToCompleteSet = db.Column(db.Integer,nullable=True)

class PropertiesCard(db.Model):
    propertiesCardId = db.Column(db.Integer, primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
    primaryColourId = db.Column(db.Enum(Enum.Colours),db.ForeignKey(PropertiesColour.colourId),nullable=True)
    secondaryColourId = db.Column(db.Enum(Enum.Colours),db.ForeignKey(PropertiesColour.colourId),nullable=True)
    price= db.Column(db.Integer,nullable=False)
    primaryColourDetails = db.relationship(PropertiesColour,primaryjoin=primaryColourId==PropertiesColour.colourId)
    secondaryColourDetails = db.relationship(PropertiesColour,primaryjoin=secondaryColourId==PropertiesColour.colourId)

class CashCard(db.Model):
    cashCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    price = db.Column(db.Integer,nullable=False)


class RentCard(db.Model):
    rentCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    primaryColourId = db.Column(db.Enum(Enum.Colours),db.ForeignKey(PropertiesColour.colourId),nullable=True)
    secondaryColourId = db.Column(db.Enum(Enum.Colours),db.ForeignKey(PropertiesColour.colourId),nullable=True)
    payee = db.Column(db.Enum(Enum.Payee),nullable=False)
    price= db.Column(db.Integer,nullable=False)
    primaryColourDetails = db.relationship(PropertiesColour,primaryjoin=primaryColourId==PropertiesColour.colourId)
    secondaryColourDetails = db.relationship(PropertiesColour,primaryjoin=secondaryColourId==PropertiesColour.colourId)

class ActionCard(db.Model):
    actionCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
    price= db.Column(db.Integer,nullable=False)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=False)
    transactionCost= db.Column(db.Integer,nullable=True)
    

   
class Cards(db.Model):
    cardId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    cardType =  db.Column(db.Enum(Enum.CardTypes))
    propertiesCardId = db.Column(db.Integer,db.ForeignKey("properties_card.propertiesCardId"))
    cashCardId = db.Column(db.Integer,db.ForeignKey("cash_card.cashCardId"))
    rentCardId = db.Column(db.Integer,db.ForeignKey("rent_card.rentCardId"))
    actionCardId = db.Column(db.Integer,db.ForeignKey("action_card.actionCardId"))
    properties = db.relationship(PropertiesCard,primaryjoin=propertiesCardId==PropertiesCard.propertiesCardId)  
    cash = db.relationship(CashCard,primaryjoin=cashCardId==CashCard.cashCardId)  
    rent = db.relationship(RentCard,primaryjoin=rentCardId==RentCard.rentCardId)
    action = db.relationship(ActionCard,primaryjoin=actionCardId==ActionCard.actionCardId)

class GameCards(db.Model):
    __table_args__ = (
        db.UniqueConstraint('gameId', 'cardId',name='unique_game_card'),
    )
    gameCardId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId",ondelete="CASCADE"),nullable=True)
    cardId = db.Column(db.Integer,db.ForeignKey("cards.cardId"),nullable=True)
    playerId = db.Column(db.Integer,db.ForeignKey("player.playerId",ondelete="CASCADE"),nullable=True)
    cardStatus = db.Column(db.Enum(Enum.GameCardLocationStatus),nullable=False, default=Enum.GameCardLocationStatus.IsNotDrawn)
    isCardRightSideUp = db.Column(db.Boolean,nullable=False,default=True)
    assignedColourId = db.Column(db.Enum(Enum.Colours),nullable=True)
    card =  db.relationship(Cards,primaryjoin=cardId==Cards.cardId)  

class Player(db.Model):
    __table_args__ = (
        db.UniqueConstraint('gameId', 'playerName',name='unique_player'),
    )
    playerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    playerPassCode = db.Column(db.String,nullable=False)
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId"),nullable=False)
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode"),nullable=False)
    playerName = db.Column(db.String)
    playerGameOrder = db.Column(db.Integer)
    playerCards =  db.relationship(GameCards,primaryjoin=playerId==GameCards.playerId)  

class Game(db.Model):
    gameId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gamePassCode = db.Column(db.String, unique=True,nullable=False,default=uuid.uuid4)
    gameMode = db.Column(db.Enum(Enum.GameMode),nullable=False,default=Enum.GameMode.RegularMode)
    numberOfPlayers = db.Column(db.Integer,nullable=False,default=0)
    name = db.Column(db.String,nullable=False,unique=True)
    gameStatus = db.Column(db.Enum(Enum.GameStatus),nullable=False, default=Enum.GameStatus.WaitingToStart)
    createdUtcDate = db.Column(db.DateTime,default=datetime.utcnow())
    players =  db.relationship(Player,primaryjoin=gameId==Player.gameId,cascade="all,delete")

    def __str__(self):
        return self.name

class GamePlayAction(db.Model):
    gamePlayActionId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    cardType = db.Column(db.Enum(Enum.CardTypes),nullable=False)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=True)
    currentGameCardLocation = db.Column(db.Enum(Enum.GameCardLocationStatus),nullable=False)
    expectedGameCardLocation = db.Column(db.Enum(Enum.GameCardLocationStatus),nullable=False)
    moveClassification = db.Column(db.Enum(Enum.ActionClassification),nullable=True)
    tradeTypes = db.Column(db.Enum(Enum.TradeTypes),nullable=True)
    isPreCheckRequired = db.Column(db.Boolean,nullable=False,default=False)

    
class GameActionTracker(db.Model):
    gameActionTrackerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId",ondelete="CASCADE"),nullable=True)
    performedByPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId",use_alter=True, name='fk_game_action_player_id',ondelete='CASCADE'))
    isGameActionCompleted  = db.Column(db.Boolean,nullable=False,default=False)
    gamePlayActionId = db.Column(db.Integer,db.ForeignKey(GamePlayAction.gamePlayActionId,use_alter=True, name='fk_game_Action_id'))
    tradeTransaction =  db.relationship("TradeTransaction")  
    gameCardId = db.Column(db.Integer,db.ForeignKey(GameCards.gameCardId),nullable=True)

class GamePlayerMoves(db.Model):
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId",ondelete="CASCADE"),primary_key=True,nullable=True)
    currentPlayerId = db.Column(db.Integer,db.ForeignKey(Player.playerId))
    numberOfMovesPlayed = db.Column(db.Integer,nullable=False,default=0)
    totalGameMoveCount = db.Column(db.Integer,nullable=False,default=0)
    gameMoveStatus = db.Column(db.Enum(Enum.GameMoveStatus),nullable=False, default=Enum.GameMoveStatus.WaitingForPlayerToBeginMove)
    gameActionTrackerId = db.Column(db.Integer,db.ForeignKey(GameActionTracker.gameActionTrackerId),nullable=True)
    gameActionTracker = db.relationship(GameActionTracker)
    currentPlayer = db.relationship(Player,primaryjoin=currentPlayerId==Player.playerId)

class TradeTransaction(db.Model):
    tradeTransactionId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gameActionTrackerId = db.Column(db.Integer,db.ForeignKey(GameActionTracker.gameActionTrackerId))
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId",ondelete="CASCADE"),nullable=True)
    isTransactionCompleted = db.Column(db.Boolean,nullable=False,default=False)
    sourcePlayerId=db.Column(db.Integer,db.ForeignKey("player.playerId",use_alter=True, name='fk_trade_transaction_player_id',ondelete='CASCADE'))
    payee = db.Column(db.Enum(Enum.Payee),nullable=False)
    total = db.Column(db.Integer)
    tradeTypes = db.Column(db.Enum(Enum.TradeTypes),nullable=True)
    tradePayeeTransactions =  db.relationship("TradePayeeTransaction")  


class TradePayeeTransaction(db.Model):
    tradePayeeTransactionId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    tradeTransactionId = db.Column(db.Integer,db.ForeignKey(TradeTransaction.tradeTransactionId),nullable=True)
    targetPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId",ondelete="CASCADE"),nullable=True)
    isTransactionCompleted = db.Column(db.Boolean,nullable=False,default=False)
    requestedGameCardIds = db.Column(db.String)
    responseGameCardIds = db.Column(db.String)

