import {MaxNumOFPlayers,GameBlockEnum,GameBlockTypeEnum} from  './constants'

export const  getGameModesList = () => {


    const gameModesList = [
        {value:1,text:'Basic (2 - 5 Players)'},
        {value:2,text:'Extended (6 - 10 Players)'}
    ];

    return gameModesList;
} 


export const getGameMode = (gameMode) => {

    const gameModesList = {
        1:'Basic (2 - 5 Players)',
        2:'Extended (6 - 10 Players)'
    };
   
    return gameModesList[gameMode];
} 

export const getTotalNumberofExpectedPlayers = (gameMode)=>{
    
    const gameModesList = {
        1:MaxNumOFPlayers.MAX_NUMBER_OF_PLAYERS_BASIC_MODE,
        2:MaxNumOFPlayers.MAX_NUMBER_OF_PLAYERS_EXTENDED_MODE
    };
   
    return gameModesList[gameMode];

}
export const getActiveGameBlocks = (numberofPlayers) =>{

    
    switch(numberofPlayers)
    {
        case 2:
            return {
                numberOfRows:1,
                hiddenBlocks:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.MiddleLeft,
                    GameBlockEnum.MiddleRight,
                    GameBlockEnum.MiddleFarRight,
                    GameBlockEnum.BottomFarLeft,
                    GameBlockEnum.BottomLeft,
                    GameBlockEnum.BottomRight,
                    GameBlockEnum.BottomFarRight,

                ],
                playersBlock:[
                    GameBlockEnum.TopFarLeft,
                    GameBlockEnum.TopFarRight
                ],
                drawPile:GameBlockEnum.TopLeft,
                activePile:GameBlockEnum.TopRight
            };
        case 3:
            return {
                numberOfRows:2,
                hiddenBlocks:[
                    GameBlockEnum.BottomFarLeft,
                    GameBlockEnum.BottomLeft,
                    GameBlockEnum.BottomFarRight,
                    GameBlockEnum.BottomFarRight,

                ],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.MiddleFarRight
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
        case 4:
            return {
                numberOfRows:2,
                hiddenBlocks:[
                    GameBlockEnum.BottomFarLeft,
                    GameBlockEnum.BottomLeft,
                    GameBlockEnum.BottomFarRight,
                    GameBlockEnum.BottomFarRight,

                ],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.TopRight,
                    GameBlockEnum.MiddleFarRight
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
        case 5:
            return {
                numberOfRows:3,
                hiddenBlocks:[],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.TopRight,
                    GameBlockEnum.MiddleFarRight,
                    GameBlockEnum.BottomRight
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
        case 6:
            return {
                numberOfRows:3,
                hiddenBlocks:[],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.TopRight,
                    GameBlockEnum.MiddleFarRight,
                    GameBlockEnum.BottomRight,
                    GameBlockEnum.BottomLeft
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
        case 7:
            return {
                numberOfRows:3,
                hiddenBlocks:[],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.TopRight,
                    GameBlockEnum.TopFarRight,
                    GameBlockEnum.MiddleFarRight,
                    GameBlockEnum.BottomRight
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
        case 8:
            return {
                numberOfRows:3,
                hiddenBlocks:[],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.TopRight,
                    GameBlockEnum.TopFarRight,
                    GameBlockEnum.MiddleFarRight,
                    GameBlockEnum.BottomRight,
                    GameBlockEnum.BottomLeft
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
        case 9:
            return {
                numberOfRows:3,
                hiddenBlocks:[],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.TopRight,
                    GameBlockEnum.TopFarRight,
                    GameBlockEnum.MiddleFarRight,
                    GameBlockEnum.BottomFarRight,
                    GameBlockEnum.BottomRight,
                    GameBlockEnum.BottomLeft
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
        case 10:
            return {
                numberOfRows:3,
                hiddenBlocks:[],
                playersBlock:[
                    GameBlockEnum.MiddleFarLeft,
                    GameBlockEnum.TopFarLeft,
                    GameBlockEnum.TopLeft,
                    GameBlockEnum.TopRight,
                    GameBlockEnum.TopFarRight,
                    GameBlockEnum.MiddleFarRight,
                    GameBlockEnum.BottomFarRight,
                    GameBlockEnum.BottomRight,
                    GameBlockEnum.BottomLeft,
                    GameBlockEnum.BottomFarLeft
                ],
                drawPile:GameBlockEnum.MiddleLeft,
                activePile:GameBlockEnum.MiddleRight
            };
    }
    
}


export const getBlockProperty = (blockName,players,activeBlocks) =>{

    const blockType = activeBlocks.playersBlock.includes(blockName)?GameBlockTypeEnum.PlayerBlock:
                activeBlocks.drawPile.includes(blockName)?GameBlockTypeEnum.DrawCardsBlock:
                activeBlocks.activePile.includes(blockName)?GameBlockTypeEnum.ActiveCardsBlock:
                activeBlocks.hiddenBlocks.includes(blockName)?GameBlockTypeEnum.HiddenBlock:null;
   
    const blockNumber = activeBlocks.playersBlock.findIndex(t=>t == blockName)+1;
    
    return {
        blockName:blockName,
        player:blockType == GameBlockTypeEnum.PlayerBlock?players.find(t=>t.playerGameOrder == blockNumber):null,
        blockType:blockType
    };
}


export const sortCardsByLastUpdateDate = (unsortedList) =>{
    
    return unsortedList.sort((a,b)=>{
        if(a.lastUpdated == null)
            return 1;
        else if(b.lastUpdated == null)
            return -1;

        return new Date(a.lastUpdated).getTime()-new Date(b.lastUpdated).getTime();
    });
}


export const getCardSetTotal = (list) =>{
    return list.reduce((total, gameCard) => total + (gameCard?.card?.action?.price || 0) + (gameCard?.card?.cash?.price || 0) + (gameCard?.card?.properties?.price || 0) +(gameCard?.card?.rent?.price || 0) , 0);
}



export const getCurrentPlayerPropertyPileCards = (game,currentPlayer) =>{

    const playerFound = game.players.find((player)=>player.playerId === currentPlayer.playerId);
    console.log(playerFound);
    return playerFound.propertyPileCards;
}


export const getRentCost = (gameCard,propertyPileCards) =>{
    const rentProperties = propertyPileCards.filter(card=>card.groupId == gameCard.groupId);
 
    const numberOfRentPropertiesOwned = rentProperties.length;

    switch(numberOfRentPropertiesOwned){
        case 1:
            return gameCard.assignedColourDetails.onePairRentPrice;
        case 2:
            return gameCard.assignedColourDetails.twoPairRentPrice;
        case 3:
            return gameCard.assignedColourDetails.threePairRentPrice;
        case 4:
            return gameCard.assignedColourDetails.fourPairRentPrice;
        default:
            return 0;
    }
}

export const getColourName = (colourId)=>{
    return {
        0:"Any",
        1:"Green",
        2:"Brown",
        3:"DarkBlue",
        4:"LightBlue",
        5:"Orange",
        6:"Pink",
        7:"Black",
        8:"Red",
        9:"Yellow",
        10:"Neutral"
    }[colourId];

}


