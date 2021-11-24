
export const ActionTypes = {
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
    ActiveCardsBlock:3
}

export const CardTypeEnum = {
    FaceDownCard:1,
    DrawCard:2,
    MiniFaceDownCard:3,
    PlaceholderCard:4,
    FaceUpCard:5,
    InPlayCard:6
}

export const MAX_NUMBER_OF_MOVES = 3

export const GameMoveStatusEnum = { 
    WaitingForPlayerToBeginMove:0,
    DrawTwoCardsInProgress:1,
    MoveInProgress:2,
    MoveComplete:3,
    SkipYourTurn:4
}

export const ActionClassificationEnum = {
    NoActionRequiredMove:1,
    SingleRentPlayerPaymentRequiredMove:2,
    MultipleRentPlayerPaymentsRequiredMove:3,
    GainCardsMove:4,
    SinglePlayerPaymentRequiredMove:5,
    MultiplePlayerPaymentsRequiredMove:6,
    CancelActionMove:7,
    SlyStealMove:8,
    ForcedTradeMove:9,
    DealBreakerMove:10,
    MustPlayDoubleTheRentMove:11,
    RotatingCardMove:12,
    MovePropertyCardMove:13
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