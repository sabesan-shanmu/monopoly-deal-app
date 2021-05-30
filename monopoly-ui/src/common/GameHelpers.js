import {MaxNumOFPlayers} from  './constants'

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

export const getTotalNumberofExpecctedPlayers = (gameMode)=>{
    
    const gameModesList = {
        1:MaxNumOFPlayers.MAX_NUMBER_OF_PLAYERS_BASIC_MODE,
        2:MaxNumOFPlayers.MAX_NUMBER_OF_PLAYERS_EXTENDED_MODE
    };
   
    return gameModesList[gameMode];

}