import {gameActionTrackerApi} from '../api/gameActionTrackerApi' 
import {gameCardsApi} from '../api/gameCardsApi'


export const startGameActionSequence = (game,player,gameCard,gameActionTracker) => {
    console.log("Start Game Action Sequence");
    //1. create game action tracker
    const actionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:player.playerId,
        gamePlayActionId:gameActionTracker.gamePlayActionId,
        gameCardId:gameCard.gameCardId
    };
    gameActionTrackerApi.post(game.links.gameActionTrackers,player.accessToken,actionTrackerPayload)
    .then((success)=>{
        console.log(success.data);
        //2. move the card
        const gameCardPayload = {
            gameCardId:gameCard.gameCardId,
            cardLocationStatus:gameActionTracker.expectedGameCardLocation
        };
        return gameCardsApi.patch(gameCard.links.self,player.accessToken,gameCardPayload);
        
    }) 
    .then((success)=>{console.log(success.data)})
    .catch((error)=>{console.log(error.response.data)});
 

}

export const rotateCard = (game,player,gameCard) => {
    //1. rotate the card
    const gameCardPayload = {
        gameCardId:gameCard.gameCardId,
        isCardRightSideUp:!gameCard.isCardRightSideUp
    };
    gameCardsApi.patch(gameCard.links.self,player.accessToken,gameCardPayload)
    .then((success)=>{console.log(success.data)})
    .catch((error)=>{console.log(error.response.data)});
}

/*
    Actions that are considered moves
    1. player block rotate  
    2. player block move (can only be done for same colour and wildcard , must have no house/hotel on it moved to empty colour)
    3. my own cards(whatever is applicable see Note 1) (rotate card)

    Things that I can do do when its not my turn:
    1. player block pay for rent (must equal or greater than total) if you have no cards, then youre free. 
    2. my own cards(say no)

*/






export const endGameActionSequence = async() => {

    
}