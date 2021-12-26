from monopoly import db
import monopoly.common.enums as Enum
import uuid
from datetime import datetime
from sqlalchemy import UniqueConstraint,and_
from _datetime import timezone


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
    isRotatable = db.Column(db.Boolean,default=False)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=True)

class CashCard(db.Model):
    cashCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    price = db.Column(db.Integer,nullable=False)
    name = db.Column(db.String,nullable=False)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=True)

class RentCard(db.Model):
    rentCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
    primaryColourId = db.Column(db.Enum(Enum.Colours),db.ForeignKey(PropertiesColour.colourId),nullable=True)
    secondaryColourId = db.Column(db.Enum(Enum.Colours),db.ForeignKey(PropertiesColour.colourId),nullable=True)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=False)
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
    price= db.Column(db.Integer,nullable=False)
    
class GameCards(db.Model):
    gameCardId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode",ondelete="CASCADE"),nullable=True)
    name = db.Column(db.String)
    cardId = db.Column(db.Integer,db.ForeignKey("cards.cardId"),nullable=True)
    playerId = db.Column(db.Integer,db.ForeignKey("player.playerId",ondelete="CASCADE"),nullable=True)
    cardLocationStatus = db.Column(db.Enum(Enum.GameCardLocationStatus),nullable=False, default=Enum.GameCardLocationStatus.IsNotDrawn)
    isCardRightSideUp = db.Column(db.Boolean,nullable=False,default=True)
    assignedColourId = db.Column(db.Enum(Enum.Colours),db.ForeignKey(PropertiesColour.colourId),nullable=True)
    assignedColourDetails = db.relationship(PropertiesColour,primaryjoin=assignedColourId==PropertiesColour.colourId)
    groupId = db.Column(db.String,default="0")
    card =  db.relationship(Cards,primaryjoin=cardId==Cards.cardId)  
    lastUpdated = db.Column(db.DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)

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
    onHandCards =  db.relationship(GameCards,primaryjoin=and_(playerId==GameCards.playerId,GameCards.cardLocationStatus==Enum.GameCardLocationStatus.IsOnHand))
    cashPileCards =  db.relationship(GameCards,primaryjoin=and_(playerId==GameCards.playerId,GameCards.cardLocationStatus==Enum.GameCardLocationStatus.IsPlayedOnCashPile))  
    propertyPileCards =  db.relationship(GameCards,primaryjoin=and_(playerId==GameCards.playerId,GameCards.cardLocationStatus==Enum.GameCardLocationStatus.IsPlayedOnPropertyPile))    

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
    inPlayPileCards = db.relationship(GameCards,primaryjoin=and_(gamePassCode==GameCards.gamePassCode,GameCards.cardLocationStatus==Enum.GameCardLocationStatus.IsInPlay))    
    def __str__(self):
        return self.name

class GamePlayAction(db.Model):
    gamePlayActionId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    colourId = db.Column(db.Enum(Enum.Colours),nullable=True)
    cardType = db.Column(db.Enum(Enum.CardTypes),nullable=False)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=True)
    currentGameCardLocation = db.Column(db.Enum(Enum.GameCardLocationStatus),nullable=False)
    expectedGameCardLocation = db.Column(db.Enum(Enum.GameCardLocationStatus),nullable=False)
    isPreCheckRequired = db.Column(db.Boolean,nullable=False,default=False)
    description = db.Column(db.String)

class TradePayeeTransaction(db.Model):
    tradePayeeTransactionId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode",ondelete="CASCADE"),nullable=True)
    transactionTrackerId = db.Column(db.Integer,db.ForeignKey("transaction_tracker.transactionTrackerId",use_alter=True,ondelete='CASCADE'),nullable=True)
    targetPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId",ondelete="CASCADE"),nullable=True)
    targetPlayer = db.relationship("Player",primaryjoin=targetPlayerId==Player.playerId)
    payeeTransactionStatus = db.Column(db.Enum(Enum.PayeeTransactionStatus),default=Enum.PayeeTransactionStatus.NotPaid)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=False)

   

class TransactionTracker(db.Model):
    transactionTrackerId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    gamePassCode = db.Column(db.String,db.ForeignKey("game.gamePassCode",ondelete="CASCADE"),nullable=True)
    performedByPlayerId = db.Column(db.Integer,db.ForeignKey("player.playerId",use_alter=True,ondelete='CASCADE'))  
    performedByPlayer = db.relationship(Player,primaryjoin=performedByPlayerId==Player.playerId)
    transactionTrackerStatus = db.Column(db.Enum(Enum.TransactionTrackerStatus),default=None)   
    gamePlayActionId = db.Column(db.Integer,db.ForeignKey(GamePlayAction.gamePlayActionId,use_alter=True)) 
    gamePlayAction =  db.relationship(GamePlayAction,primaryjoin=gamePlayActionId==GamePlayAction.gamePlayActionId)
    gameCardId = db.Column(db.Integer,db.ForeignKey("game_cards.gameCardId"),nullable=True)
    gameCard =  db.relationship(GameCards,primaryjoin=gameCardId==GameCards.gameCardId)
    actionType = db.Column(db.Enum(Enum.ActionTypes),nullable=True)
    tradePayeeTransactions =  db.relationship(TradePayeeTransaction,primaryjoin=transactionTrackerId==TradePayeeTransaction.transactionTrackerId)
    requestedTotal = db.Column(db.Integer) #rent, its my birthday, debt collector
    requestedColourId = db.Column(db.Enum(Enum.Colours),nullable=True)#rent,dealbreaker
    requestedGroupId = db.Column(db.String,nullable=True) #dealbreaker
    requestedGameCardId = db.Column(db.Integer,db.ForeignKey(GameCards.gameCardId),nullable=True) #sly deal,force deal
    requestGameCard = db.relationship(GameCards,primaryjoin=requestedGameCardId==GameCards.gameCardId)
    sendingGameCardId = db.Column(db.Integer,db.ForeignKey(GameCards.gameCardId),nullable=True) #force deal
    sendingGameCard = db.relationship(GameCards,primaryjoin=sendingGameCardId==GameCards.gameCardId)



class GamePlayerMoves(db.Model):
    gameId = db.Column(db.Integer,db.ForeignKey("game.gameId",ondelete="CASCADE"),primary_key=True,nullable=True)
    currentPlayerId = db.Column(db.Integer,db.ForeignKey(Player.playerId))
    numberOfMovesPlayed = db.Column(db.Integer,nullable=False,default=0)
    totalGameMoveCount = db.Column(db.Integer,nullable=False,default=0)
    gameMoveStatus = db.Column(db.Enum(Enum.GameMoveStatus),nullable=False, default=Enum.GameMoveStatus.WaitingForPlayerToBeginMove)
    transactionTrackerId = db.Column(db.Integer,db.ForeignKey(TransactionTracker.transactionTrackerId),nullable=True)
    transactionTracker = db.relationship(TransactionTracker)
    currentPlayer = db.relationship(Player,primaryjoin=currentPlayerId==Player.playerId)



