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



class ActionTypes(Enum):
    DealBreaker = 1 # can only be played if there's a set in play
    ForcedDeal = 2 # swap cards with a player
    SlyDeal = 3 # take a card from a player
    JustSayNo = 4 # can be played if something is asked to be done by a player
    DebtCollector = 5 # ask one person for money
    ItsMyBirthday = 6 # ask other player's for money
    DoubleTheRent = 7 # can only be played with rent card 
    House = 8 #no action needed
    Hotel = 9 # no action needed
    PassGo = 10 #player can draw 2 cards
 
class CardTypes(Enum):
    Properties = 1
    Cash = 2
    Rent = 3
    Action = 4

class GameCardStatus(Enum):
    IsNotDrawn = 0 #game cards no one owns
    IsOnHand = 1 #player cards owned by a player
    IsPlayedOnPropertyPile = 2 #game cards owned by player but can be shown on field that are owned by player
    IsDiscarded = 3 #game cards that are discarded and dont need to be shown to the user
    IsPlayedOnCashPile = 4 #game cards owned by player but can be shown on field that are owned by player

class GameStatus(Enum):
    WaitingToStart = 0
    InProgress = 1
    Completed = 2

class GameMoveStatus(Enum):
    WaitingForPlayerToBeginMove = 0
    MoveInProgress = 1
    MoveComplete = 2