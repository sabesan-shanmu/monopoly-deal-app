from enum import Enum

class GameMode(Enum):
    RegularMode=1
    ExtendedMode=2

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
    NoActionRequired = 0
    DealBreaker = 1 # can only be played if there's a set in play
    ForcedDeal = 2 # swap cards with a player
    SlyDeal = 3 # take a card from a player
    DebtCollector = 4 # ask one person for money
    ItsMyBirthday = 5 # ask other player's for money
    PassGo = 6 # player can draw 2 cards
    SinglePlayerRent = 7 # single player pays rent
    MultiplePlayerRent = 8 # multiple players pay rent
    DoubleTheRent = 9 # can only be played with rent card 
    House = 10 # no action needed
    Hotel = 11 # no action needed
    JustSayNo = 12 # can be played if something is asked to be done by a player
 
class CardTypes(Enum):
    Properties = 1
    Cash = 2
    Rent = 3
    Action = 4

class GameCardLocationStatus(Enum):
    IsNotDrawn = 0 # game cards no one owns
    IsOnHand = 1 # player cards owned by a player
    IsPlayedOnPropertyPile = 2 # game cards owned by player but can be shown on field that are owned by player
    IsDiscarded = 3 # game cards that are discarded and dont need to be shown to the user
    IsPlayedOnCashPile = 4 # game cards owned by player but can be shown on field that are owned by player
    IsInPlay = 5 # all the cards that the player plays on their turn. clear this once the player's turn ends

class GameStatus(Enum):
    WaitingToStart = 0
    InProgress = 1
    Completed = 2

class GameMoveStatus(Enum):
    WaitingForPlayerToBeginMove = 0
    DrawTwoCardsInProgress = 1
    MoveInProgress = 2
    MoveComplete = 3
    SkipYourTurn = 4


class VoteStatus(Enum):
    Undecided = 0
    Accepted = 1
    Declined = 2

class TransactionTrackerStatus(Enum):
    InProgress = 1
    CurrentPlayerSelection = 2
    OtherPlayerSelection = 3
    OthersAcknowledge = 4
    Completed = 5


class PayeeTransactionStatus(Enum):
    NotPaid = 1
    Paid = 2
    DeclinedTransaction = 3