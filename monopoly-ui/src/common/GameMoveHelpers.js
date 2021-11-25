import {transactionTrackerApi} from '../api/transactionTrackerApi' 
import {gameCardsApi} from '../api/gameCardsApi'
import { ActionClassificationEnum, ResourceTypes } from './constants';


export const startTransactionSequence = (game,player,gameCard,transactionTracker) => {
    console.log("Start transaction Sequence!");
    //1. create transaction tracker
    const transactionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:player.playerId,
        gamePlayActionId:transactionTracker.gamePlayActionId,
        gameCardId:gameCard.gameCardId
    };
    transactionTrackerApi.post(game.links.transactionTracker,player.accessToken,transactionTrackerPayload)
    .then((success)=>{
        console.log(success.data);
        //2. move the card
        const gameCardPayload = {
            gameCardId:gameCard.gameCardId,
            cardLocationStatus:transactionTracker.expectedGameCardLocation
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


const getMoveSequence = (move) => {
    
    return {
        [ActionClassificationEnum.NoActionRequiredMove]:""
    };

}



/*
    Actions that are considered moves
    1. player block rotate:  1. cannot rotate a complete set, if card is part of a partial set group id will need tobe updated   2. update game cards 3. create transaction 4. mark transaction as complete 5. update game move
    2. player block move: 1. must have no house/hotel and if card is part of a compplete set group id will need tobe updated 2. update game cards 3. create transaction 4. mark transaction as complete 5. update game move
    3. my own cards(whatever is applicable see Note 1) 
    Note 1:
        a. Cash Pile-AnyCard:  1.update game cards 2. create transaction 3. mark transaction as complete 4. update game move
        b. InPlay Pile-Draw Cards: 1.update game cards 2. create transaction 3. draw cards 4. mark transaction as complete 5. update game move
        c. Property Pile-PropertyCard: 1. if card colour doesnt exist and current colour is not part of any complete set create setId/ if card exists and theres room use existing groupId/wildcard can only be played if theres an existing card on field and player selects which one to play against
                         2. update game cards 3. create transaction 4. mark transaction as complete 5. update game move
        d.InPlay Pile-Sly Deal: 1. choose player and my card  2. update game cards 3. create transaction 4. complete the transaction yourselves after selecting their cards(must not be part of set) 5. Update game move
        e.InPlay Pile-Forced Deal: 1. choose player and my card  2. update game cards 3. create transaction  4. complete thetransaction yourselves after yours and their card(must not be part of set) 5. Update game move
        f.InPlay Pile-DealBreaker: 1. choose player and my card  2. update game cards 3. create transaction  4. complete the transaction yourselves after selecting their cards 5. Update game move
        g.Property Pile-Hotel/House: 1.must require full set, player chooses which group id 2. update game cards 3. create transaction 4. mark transaction as complete 5. update game move
        h.InPlay Pile-Debt Collector: 1.choose player that has cards on field 2. update game cards 3. create transaction  4. selected player(s) find a way to pay 5. mark transaction as complete(once notified everyon paid) 6. update game move
        i.InPlay Pile-Its My Bday: 1. update game cards 3. create transaction + choose everyone 4. selected player(s) find a way to pay   5. mark transaction as complete(once notified everyon paid,if no cards auto mark them as complete) 6. update game move
        j.InPlay Pile-Multiple Rent:1. update game cards 3. create transaction + choose everyone 4. selected player(s) find a way to pay   5. mark transaction as complete(once notified everyon paid,if no cards auto mark them as complete) 6. update game move
        k.InPlay Pile-Single Rent:1. choose player + colour  2. update game cards 3. create transaction  4. selected player(s) find a way to pay   5. mark transaction as complete(once notified everyon paid,if no cards auto mark them as complete) 6. update game move
        l.InPlay Pile-Rent + Double the Rent: 1. update game cards 3. update game move 2.start turn game move , then either j or k
    Things that I can do do when its not my turn(update transactionType table):
    1. player block pay for rent (must equal or greater than total) if you have no cards, then youre free.  1. update game_card(if applicable) 2. transaction payee
    2. my own cards(say no)  1. update game_card 2. transaction payee

    End: Player must discard extra cards
*/






export const endtransactionSequence = async() => {

    
}