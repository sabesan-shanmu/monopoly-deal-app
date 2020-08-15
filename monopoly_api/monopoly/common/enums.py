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
    Magenta=11


class Payee(Enum):
    Single = 1
    All = 2



class ActionType(Enum):
    DealBreaker = 1
    ForcedDeal = 2
    SlyDeal = 3
    JustSayNo = 4
    DebtCollector = 5
    ItsMyBirthday = 6
    DoubleTheRent = 7
    House = 8
    Hotel = 9
    PassGo = 10
 
class CardTypes(Enum):
    Properties = 1
    Cash = 2
    Rent = 3
    Action = 4

class GameCardStatus(Enum):
    IsNotDrawn = 0 #game cards no one owns
    IsOnHand = 1 #player cards owend by a player
    IsPlayedOnPropertyPile = 2 #game cards owned by player but can be shown on field that are owned by player
    IsDiscarded = 3 #game cards that are discarded and dont need to be shown to the user
    IsPlayedOnCashPile = 4

class GameStatus(Enum):
    WaitingToStart = 0
    InProgress = 1
    Completed = 2
