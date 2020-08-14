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
    DrawCards = 0  # current player only
    ForceDeal = 1 # 2 players
    SlyDeal = 2 # 2 players
    SinglePay = 3 # 2 players
    AllPlay = 4 # all players
    Reject = 5 # 2 players
    StealItAll = 6 # 2 players
    DoubleRent = 7 # add on


 
class CardTypes(Enum):
    Properties = 1
    Cash = 2
    Rent = 3
    Action = 4

class GameCardStatus(Enum):
    IsNotDrawn = 0 #game cards no one owns
    IsOnHand = 1 #player cards owend by a player
    IsPlayedOnField = 2 #game cards owned by player but can be shown on field that are owned by player
    IsDiscarded = 3 #game cards that are discarded and dont need to be shown to the user


class GameStatus(Enum):
    WaitingToStart = 0
    InProgress = 1
    Completed = 2
