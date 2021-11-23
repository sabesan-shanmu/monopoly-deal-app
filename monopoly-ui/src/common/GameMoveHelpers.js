import {transactionTrackerApi} from '../api/transactionTrackerApi' 
import {gameCardsApi} from '../api/gameCardsApi'


export const startTransactionSequence = (game,player,gameCard,transactionTracker) => {
    console.log("Start Game Action Sequence!");
    //1. create game action tracker
    const actionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:player.playerId,
        gamePlayActionId:transactionTracker.gamePlayActionId,
        gameCardId:gameCard.gameCardId
    };
    transactionTrackerApi.post(game.links.transactionTracker,player.accessToken,actionTrackerPayload)
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

/*
    Actions that are considered moves
    1. player block rotate:  1. game action 2. cannot rotate a complete set, if card is part of a partial set group id will need tobe updated   3. update game cards 4. create transaction 5. mark transaction as complete 6. update game move
    2. player block move 1. game action 2. must have no house/hotel and if card is part of a compplete set group id will need tobe updated 3. update game cards 4. create transaction 5. mark transaction as complete 6. update game move
    3. my own cards(whatever is applicable see Note 1) 
    Note 1:
        a. Cash Pile-AnyCard:  1. game action 2. update game cards 3. create transaction 4. mark transaction as complete 5. update game move
        b. InPlay Pile-Draw Cards: 1. game action 2. update game cards 3. create transaction 4. draw cards 5. mark transaction as complete 6. update game move
        c. Property Pile-PropertyCard: 1. game action 2. if card colour doesnt exist and current colour is not part of any complete set create setId/ if card exists and theres room use existing groupId/wildcard can only be played if theres an existing card on field and player selects which one to play against
                         3. update game cards 4. create transaction 5. mark transaction as complete 6. update game move
        d.InPlay Pile-Sly Deal: 1. game action 2. update game cards 3. create transaction + choose player 4. complete the transaction yourselves after selecting their cards(must not be part of set) 5. Update game move
        e.InPlay Pile-Forced Deal: 1. game action 2. update game cards 3. create transaction + choose player 4. complete thetransaction yourselves after yours and their card(must not be part of set) 5. Update game move
        f.InPlay Pile-DealBreaker: 1. game action 2. update game cards 3. create transaction + choose player  4. complete the transaction yourselves after selecting their cards 5. Update game move
        g.Property Pile-Hotel/House: 1. game action 2. must require full set, player chooses which group id 3. update game cards 4. create transaction 5. mark transaction as complete 6. update game move
        h.InPlay Pile-Debt Collector:  1. game action 2. update game cards 3. create transaction + choose player that has cards on field 4. selected player(s) find a way to pay 5. mark transaction as complete(once notified everyon paid) 6. update game move
        i.InPlay Pile-Its My Bday: 1. game action 2. update game cards 3. create transaction + choose everyone 4. selected player(s) find a way to pay   5. mark transaction as complete(once notified everyon paid,if no cards auto mark them as complete) 6. update game move
        j.InPlay Pile-Multiple Rent:1. game action 2. update game cards 3. create transaction + choose everyone 4. selected player(s) find a way to pay   5. mark transaction as complete(once notified everyon paid,if no cards auto mark them as complete) 6. update game move
        k.InPlay Pile-Single Rent:1. game action 2. update game cards 3. create transaction + choose player + colour  4. selected player(s) find a way to pay   5. mark transaction as complete(once notified everyon paid,if no cards auto mark them as complete) 6. update game move
        l.InPlay Pile-Rent + Double the Rent: 1. game action 2. update game cards 3. update game move 2.start turn game move , then either j or k
    Things that I can do do when its not my turn(update transactionType table):
    1. player block pay for rent (must equal or greater than total) if you have no cards, then youre free. 
    2. my own cards(say no)

    End: Player must discard extra cards
*/






export const endtransactionSequence = async() => {

    
}