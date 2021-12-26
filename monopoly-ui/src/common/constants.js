
export const ResourceTypes = {
    GetAllResources:1,
    GetResource:2,
    CreateResource:3,
    UpdateResource:4,
    DeleteResource:5,
    LoadResource:6
}

export const GameStatusEnum = {
    WaitingToStart:0,
    InProgress:1,
    Completed:2
}


export const MaxNumOFPlayers = {
    MAX_NUMBER_OF_PLAYERS_BASIC_MODE:5,
    MAX_NUMBER_OF_PLAYERS_EXTENDED_MODE:10
}

export const VoteStatusEnum = {
    Undecided:0,
    Accepted:1,
    Declined:2
}


export const GameBlockEnum = {
    TopFarLeft:"TopFarLeft",
    TopLeft:"TopLeft",
    TopRight:"TopRight",
    TopFarRight:"TopFarRight",
    MiddleFarLeft:"MiddleFarLeft",
    MiddleLeft:"MiddleLeft",
    MiddleRight:"MiddleRight",
    MiddleFarRight:"MiddleFarRight",
    BottomFarLeft:"BottomFarLeft",
    BottomLeft:"BottomLeft",
    BottomRight:"BottomRight",
    BottomFarRight:"BottomFarRight"
}

export const GameBlockTypeEnum = {
    PlayerBlock:1,
    DrawCardsBlock:2,
    ActiveCardsBlock:3,
    HiddenBlock:4
}

export const CardTypeEnum = {
    FaceDownCard:1,
    DrawCard:2,
    MiniFaceDownCard:3,
    FaceUpCard:4,
    InPlayCard:5
}

export const MAX_NUMBER_OF_MOVES = 3

export const GameMoveStatusEnum = { 
    WaitingForPlayerToBeginMove:0,
    DrawTwoCardsInProgress:1,
    MoveInProgress:2,
    MoveComplete:3,
    SkipYourTurn:4
}


export const ActionTypesEnum = {
    NoActionRequired:0,
    DealBreaker:1, // can only be played if there's a set in play
    ForcedDeal:2, // swap cards with a player
    SlyDeal:3, // take a card from a player
    DebtCollector : 4, // ask one person for money
    ItsMyBirthday : 5, // ask other player's for money
    PassGo : 6, // player can draw 2 cards
    SinglePlayerRent : 7, // single player pays rent
    MultiplePlayerRent : 8, // multiple players pay rent
    DoubleTheRent : 9, // can only be played with rent card 
    House : 10, // no action needed
    Hotel : 11, // no action needed
    JustSayNo:12 //can be played if something is asked to be done by a player
 
}

export const PayeeTransactionStatusEnum = {
    NotPaid:1,
    Paid:2,
    DeclinedTransaction:3
}



export const GameCardLocationStatusEnum = {
    IsNotDrawn : 0, //game cards no one owns
    IsOnHand : 1, //player cards owned by a player
    IsPlayedOnPropertyPile : 2, //game cards owned by player but can be shown on field that are owned by player
    IsDiscarded:3, //game cards that are discarded and dont need to be shown to the user
    IsPlayedOnCashPile:4, //game cards owned by player but can be shown on field that are owned by player
    IsInPlay : 5 //all the cards that the player plays on their turn. clear this once the player's turn ends
}

export const CardTypesEnum = {
    Properties:1,
    Cash:2,
    Rent:3,
    Action:4
}




export const ColoursEnum = {
    Any:0,
    Green:1,
    Brown:2,
    DarkBlue:3,
    LightBlue:4,
    Orange:5,
    Pink:6,
    Black:7,
    Red:8,
    Yellow:9,
    Neutral:10,
}

export const GamePlayActionEnum = {
    PlayOnPropertyPile:1,
    CashOnCashPile:2,
    SingleRentOnCashPile:3,
    MultipleRentOnCashPile:4,
    SingleRentOnPlayPile:5,
    MultipleRentOnPlayPile:6,
    DoubleTheRentOnPlayPile:7,
    HotelOnCashPile:8,
    HouseOnCashPile:9,
    PassGoOnPlayPile:10,
    PassGoOnCashPile:11,
    DoubleTheRentOnCashPile:12,
    ItsMyBirthdayOnPlayPile:13,
    ItsMyBirthdayCashPile:14,
    DebtCollectorOnPlayPile:15,
    DebtCollectorOnCashPile:16,
    JustSayNoOnCashPile:17,
    SlyDealOnPlayPile:18,
    SlyDealOnCashPile:19,
    ForcedDealOnPlayPile:20,
    ForcedDealOnCashPile:21,
    DealBreakerOnPlayPile:22,
    DealBreakerOnCashPile:23,
    GreenOnPropertyPile:24,
    BrownOnPropertyPile:25,
    DarkBlueOnPropertyPile:26,
    LightBlueOnPropertyPile:27,
    OrangeOnPropertyPile:28,
    PinkOnPropertyPile:29,
    BlackOnPropertyPile:30,
    RedOnPropertyPile:31,
    YellowOnPropertyPile:32,
    NeutralOnPropertyPile:33
}


export const TransactionTrackerStatusEnum = {
    InProgress:1,
    CurrentPlayerSelection:2,
    OtherPlayerSelection:3,
    OthersAcknowledge:4,
    Completed:5
}