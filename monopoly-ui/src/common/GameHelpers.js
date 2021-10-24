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
                playersBlock:[
                    GameBlockEnum.TopFarLeft,
                    GameBlockEnum.TopFarRight
                ],
                drawPile:GameBlockEnum.TopLeft,
                activePile:GameBlockEnum.TopRight
            };
        case 3:
            return {
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
                activeBlocks.activePile.includes(blockName)?GameBlockTypeEnum.ActiveCardsBlock:null;
    console.log(blockType);
    const blockNumber = activeBlocks.playersBlock.findIndex(t=>t == blockName)+1;
    
    return {
        blockName:blockName,
        player:blockType == GameBlockTypeEnum.PlayerBlock?players.find(t=>t.playerGameOrder == blockNumber):null,
        blockType:blockType
    };
}