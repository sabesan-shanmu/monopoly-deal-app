import {gameActionTrackerApi} from '../api/gameActionTrackerApi' 
import {gameCardsApi} from '../api/gameCardsApi'


export const startGameActionSequence = (game,player,gameCard,gameActionTracker) => {
    console.log("Start Game Action Sequence");
    //1. create game action tracker
    const actionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:player.playerId,
        gamePlayActionId:gameActionTracker.gamePlayActionId
    };
    gameActionTrackerApi.post(game.links.gameActionTrackers,player.accessToken,actionTrackerPayload)
    .then((success)=>{
        console.log(success.data);
        //2. move the card
        
        const gameCardPayload = {
            gameCardId:gameCard.gameCardId,
            cardStatus:gameActionTracker.expectedGameCardLocation
        };
        return gameCardsApi.patch(gameCard.links.self,player.accessToken,gameCardPayload);
        
    }) 
    .catch((error)=>{console.log(error.response.data)});
 

}



export const endGameActionSequence = async() => {

    
}