from monopoly import db
import uuid
import enum

class Colours(enum.Enum):
    Any=0
    Green=1
    Brown=2
    DarkBlue=3
    LightBlue=4
    Orange=5
    Pink=6
    Black=7
    Red=8
    Yellow=9
    Neutral=10



class PropertiesCard(db.Model):
    propertiesCardId = db.Column(db.Integer, primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
    primaryColourId = db.Column(db.Integer,db.Enum(Colours),nullable=False)
    secondaryColourId = db.Column(db.Integer,db.Enum(Colours),nullable=True)
    price= db.Column(db.Integer,nullable=False)


class PropertiesColor(db.Model):
    colorId = db.Column(db.Integer,db.Enum(Colours),nullable=False,primary_key=True)
    onePairRentPrice = db.Column(db.Integer,nullable=False)
    twoPairRentPrice = db.Column(db.Integer,nullable=False)
    threePairRentPrice = db.Column(db.Integer,nullable=False)
    fourPairRentPrice = db.Column(db.Integer,nullable=False)
    numberNeededToCompleteSet = db.Column(db.Integer,nullable=False)

class CashCard(db.Model):
    cashCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    price = db.Column(db.Integer,nullable=False)

class Payee(enum.Enum):
    Single = 1
    All = 2

class RentCard(db.Model):
    rentCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    primaryColourId = db.Column(db.Integer,db.Enum(Colours),nullable=False)
    secondaryColourId = db.Column(db.Integer,db.Enum(Colours),nullable=True)
    payee = db.Column(db.Integer,db.Enum(Payee),nullable=False)


class ActionType(enum.Enum):
    DrawCards = 0
    ForceDeal = 1
    SlyDeal = 2
    SinglePay = 3
    AllPlay = 4
    Reject = 5
    StealItAll = 6
    DoubleRent = 7

class ActionCard(db.Model):
    actionCardId = db.Column(db.Integer,primary_key=True,nullable=False)
    name = db.Column(db.String,nullable=False)
    price= db.Column(db.Integer,nullable=False)
    actionType = db.Column(db.Integer,db.Enum(ActionType),nullable=False)




    
    
class CardTypes(enum.Enum):
    Properties = 1
    Cash = 2
    Rent = 3
    Action = 4


class Cards(db.Model):
    cardId = db.Column(db.Integer,primary_key=True,unique=True,nullable=False)
    cardType =  db.Column(db.Enum(CardTypes))
    propertiesCardId = db.Column(db.Integer,db.ForeignKey("properties_card.propertiesCardId"))
    cashCardId = db.Column(db.Integer,db.ForeignKey("cash_card.cashCardId"))
    rentId = db.Column(db.Integer,db.ForeignKey("rent_card.rentCardId"))
    actionId = db.Column(db.Integer,db.ForeignKey("action_card.actionCardId"))
    properties = db.relationship("properties_card")  
    cash = db.relationship("cash_card")  
    rent = db.relationship("rent_card")  
    action = db.relationship("action_card")  
