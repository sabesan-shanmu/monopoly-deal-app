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
    name = db.Column(db.String,nullable=False)

class RentCard(db.Model):
    rentCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
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
    cardImageUrl = db.Column(db.String)
    name = db.Column(db.String)
    propertiesCardId = db.Column(db.Integer,db.ForeignKey("properties_card.propertiesCardId"))
    cashCardId = db.Column(db.Integer,db.ForeignKey("cash_card.cashCardId"))
    rentCardId = db.Column(db.Integer,db.ForeignKey("rent_card.rentCardId"))
    actionCardId = db.Column(db.Integer,db.ForeignKey("action_card.actionCardId"))
    properties = db.relationship(PropertiesCard,primaryjoin=propertiesCardId==PropertiesCard.propertiesCardId)  
    cash = db.relationship(CashCard,primaryjoin=cashCardId==CashCard.cashCardId)  
    rent = db.relationship(RentCard,primaryjoin=rentCardId==RentCard.rentCardId)
    action = db.relationship(ActionCard,primaryjoin=actionCardId==ActionCard.actionCardId)

class GameCards(db.Model):
    gameCardId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode",ondelete="CASCADE"),nullable=True)
    name = db.Column(db.String)
    cardId = db.Column(db.Integer,db.ForeignKey("cards.cardId"),nullable=True)
    playerId = db.Column(db.Integer,db.ForeignKey("player.playerId",ondelete="CASCADE"),nullable=True)
    cardStatus = db.Column(db.Enum(Enum.GameCardLocationStatus),nullable=False, default=Enum.GameCardLocationStatus.IsNotDrawn)
    isCardRightSideUp = db.Column(db.Boolean,nullable=False,default=True)
    assignedColourId = db.Column(db.Enum(Enum.Colours),nullable=True)
    setGroupId = db.Column(db.Integer,nullable=True)
    card =  db.relationship(Cards,primaryjoin=cardId==Cards.cardId)  

class Player(db.Model):
    __table_args__ = (
        db.UniqueConstraint('gameId', 'playerName',name='unique_player'),
    )
    playerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    playerPassCode = db.Column(db.String,nullable=False)
    imageId = db.Column(db.Integer,nullable=False)
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId"),nullable=False)
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode"),nullable=False)
    playerName = db.Column(db.String)
    playerGameOrder = db.Column(db.Integer)
    voteStatusId = db.Column(db.Enum(Enum.VoteStatus),default=Enum.VoteStatus.Undecided)
    playerCards =  db.relationship(GameCards,primaryjoin=playerId==GameCards.playerId)  

class Game(db.Model):
    __table_args__ = (
        db.UniqueConstraint('name',name='unique_game'),
    )
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
    transactionType = db.Column(db.Enum(Enum.TransactionType),nullable=True)
    isPreCheckRequired = db.Column(db.Boolean,nullable=False,default=False)
    description = db.Column(db.String)
    
class GameActionTracker(db.Model):
    gameActionTrackerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode",ondelete="CASCADE"),nullable=True)
    performedByPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId",use_alter=True, name='fk_game_action_player_id',ondelete='CASCADE'))
    isGameActionCompleted  = db.Column(db.Boolean,nullable=False,default=False)
    gamePlayActionId = db.Column(db.Integer,db.ForeignKey(GamePlayAction.gamePlayActionId,use_alter=True, name='fk_game_Action_id'))
    transactionTracker =  db.relationship("TransactionTracker")  
    gameCardId = db.Column(db.Integer,db.ForeignKey("game_cards.gameCardId"),nullable=True)
    gameCard =  db.relationship(GameCards,primaryjoin=gameCardId==GameCards.gameCardId)  

class GamePlayerMoves(db.Model):
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId",ondelete="CASCADE"),primary_key=True,nullable=True)
    currentPlayerId = db.Column(db.Integer,db.ForeignKey(Player.playerId))
    numberOfMovesPlayed = db.Column(db.Integer,nullable=False,default=0)
    totalGameMoveCount = db.Column(db.Integer,nullable=False,default=0)
    gameMoveStatus = db.Column(db.Enum(Enum.GameMoveStatus),nullable=False, default=Enum.GameMoveStatus.WaitingForPlayerToBeginMove)
    gameActionTrackerId = db.Column(db.Integer,db.ForeignKey(GameActionTracker.gameActionTrackerId),nullable=True)
    gameActionTracker = db.relationship(GameActionTracker)
    currentPlayer = db.relationship(Player,primaryjoin=currentPlayerId==Player.playerId)

class TransactionTracker(db.Model):
    transactionTrackerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gameActionTrackerId = db.Column(db.Integer,db.ForeignKey(GameActionTracker.gameActionTrackerId))
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode",ondelete="CASCADE"),nullable=True)
    isTransactionCompleted = db.Column(db.Boolean,nullable=False,default=False)
    sourcePlayerId=db.Column(db.Integer,db.ForeignKey("player.playerId",use_alter=True, name='fk_trade_transaction_player_id',ondelete='CASCADE'))
    total = db.Column(db.Integer)
    transactionType = db.Column(db.Enum(Enum.TransactionType),nullable=True)
    tradePayeeTransactions =  db.relationship("TradePayeeTransaction")  


class TradePayeeTransaction(db.Model):
    tradePayeeTransactionId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    tradeTransactionId = db.Column(db.Integer,db.ForeignKey(TransactionTracker.transactionTrackerId),nullable=True)
    targetPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId",ondelete="CASCADE"),nullable=True)
    isPayeeTransactionCompleted = db.Column(db.Boolean,nullable=False,default=False)
    requestedGameCardIds = db.Column(db.String)
    responseGameCardIds = db.Column(db.String)

