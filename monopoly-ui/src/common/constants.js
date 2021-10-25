
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
    PlaceholderCard:4
}

export const MAX_NUMBER_OF_MOVES = 3

export const GameMoveStatusEnum = { 
    WaitingForPlayerToBeginMove:0,
    MoveInProgress:1,
    MoveComplete:2,
    SkipYourTurn:3
}