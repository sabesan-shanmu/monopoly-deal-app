from enum import Enum




class Colours(Enum):
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


class Payee(Enum):
    Single = 1
    All = 2



class ActionType(Enum):
    DrawCards = 0
    ForceDeal = 1
    SlyDeal = 2
    SinglePay = 3
    AllPlay = 4
    Reject = 5
    StealItAll = 6
    DoubleRent = 7


 
class CardTypes(Enum):
    Properties = 1
    Cash = 2
    Rent = 3
    Action = 4

class GameCardStatus(Enum):
    IsNotDrawn = 0
    IsOnHand = 1
    IsPlayedOnField = 2
    IsDiscarded = 3


class GameStatus(Enum):
    WaitingToStart = 0
    InProgress = 1
    Completed = 2
