import {transactionTrackerApi,singleTransactionTrackerApi} from '../api/transactionTrackerApi' 
import {gameCardsApi} from '../api/gameCardsApi'
import {gameMoveApi} from '../api/gameMoveApi'
import {GameMoveStatusEnum,ColoursEnum,TransactionTrackerStatusEnum} from './constants';
import { getCurrentPlayerPropertyPileCards,getColourName } from './GameHelpers';

export const startPropertyActionSequence = (game,currentPlayer,gameCard,move) =>{
    console.log("Started startPropertyActionSequence!");
    //1. update assigned colour
    console.log(move);
    gameCard.assignedColourId = move.colourId != ColoursEnum.Any? move.colourId:gameCard.assignedColourId;
    
    //2. update group id
    const currentPlayerPropertyPileCards = getCurrentPlayerPropertyPileCards(game,currentPlayer);
    gameCard.groupId = getGroupId(gameCard,currentPlayerPropertyPileCards)
    
    startNoActionSequence(game,currentPlayer,gameCard,move);
}


export const startPassGoInPlayPileActionSequence = (game,currentPlayer,gameCard,move) =>{
    console.log("Started startPassGoInPlayPileActionSequence!");
    let createdTransaction = {};
    //1. create transaction tracker
    const transactionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:currentPlayer.playerId,
        gamePlayActionId:move.gamePlayActionId,
        gameCardId:gameCard.gameCardId,
        transactionTrackerStatus:TransactionTrackerStatusEnum.InProgress
    };
    transactionTrackerApi.post(game.links.transactionTracker,currentPlayer.accessToken,transactionTrackerPayload)
    .then((success)=>{
        console.log(success.data);
        createdTransaction = success.data
        //2. move the card
        const gameCardPayload = {
            gameCardId:gameCard.gameCardId,
            cardLocationStatus:move.expectedGameCardLocation,
            groupId:gameCard.groupId,
            assignedColourId:gameCard.assignedColourId,
            isCardRightSideUp:gameCard.isCardRightSideUp
        };
        return gameCardsApi.patch(gameCard.links.self,currentPlayer.accessToken,gameCardPayload);
        
    })
    .then((success)=>{
        console.log(success.data);
        console.log("Partiallly Completed startNoActionSequence!");
    })
    .catch((error)=>{console.log(error.response.data)}); 
}



export const startNoActionSequence = (game,currentPlayer,gameCard,move) => {
    console.log("Started startNoActionSequence!");
    let createdTransaction = {};
    //1. create transaction tracker
    const transactionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:currentPlayer.playerId,
        gamePlayActionId:move.gamePlayActionId,
        gameCardId:gameCard.gameCardId,
        transactionTrackerStatus:TransactionTrackerStatusEnum.InProgress
    };
    transactionTrackerApi.post(game.links.transactionTracker,currentPlayer.accessToken,transactionTrackerPayload)
    .then((success)=>{
        console.log(success.data);
        createdTransaction = success.data
        //2. move the card
        const gameCardPayload = {
            gameCardId:gameCard.gameCardId,
            cardLocationStatus:move.expectedGameCardLocation,
            groupId:gameCard.groupId,
            assignedColourId:gameCard.assignedColourId,
            isCardRightSideUp:gameCard.isCardRightSideUp
        };
        return gameCardsApi.patch(gameCard.links.self,currentPlayer.accessToken,gameCardPayload);
        
    }) 
    .then((success)=>{
        console.log(success.data)
        //3. patch the transaction tracker to complete
        const singletransactionTrackerPayload = {
            transactionTrackerId:createdTransaction.transactionTrackerId,
            transactionTrackerStatus:TransactionTrackerStatusEnum.Completed
        };
        return singleTransactionTrackerApi.patch(createdTransaction.links.self,currentPlayer.accessToken,singletransactionTrackerPayload);

    })
    .then((success)=>{
        console.log(success.data)
        //4. mark the move as complete 
        const movePayload = {
            gameMoveStatus:GameMoveStatusEnum.MoveComplete,
            currentPlayerId:currentPlayer.playerId
        };
        return gameMoveApi.patch(game.links.gameMoves,currentPlayer.accessToken,movePayload);

    })
    .then((success)=>{
        console.log(success.data);
        console.log("Completed startNoActionSequence!");
    })
    .catch((error)=>{console.log(error.response.data)});
 

}

export const rotateCard = (game,currentPlayer,gameCard) => {
    //1. rotate the card
    const gameCardPayload = {
        gameCardId:gameCard.gameCardId,
        isCardRightSideUp:!gameCard.isCardRightSideUp,
        assignedColourId:gameCard.assignedColourId == gameCard.card.properties.primaryColourId? gameCard.card.properties.secondaryColourId:gameCard.card.properties.primaryColourId
    };
    gameCardsApi.patch(gameCard.links.self,currentPlayer.accessToken,gameCardPayload)
    .then((success)=>{console.log(success.data)})
    .catch((error)=>{console.log(error.response.data)});
}


export const getGroupId = (gameCard,currentPlayerPropertyPileCards)=>{

    const foundCards = currentPlayerPropertyPileCards.filter((card)=> card.assignedColourId == gameCard.assignedColourId);

    //no card found with that colour
    if(foundCards.length == 0)
        return getColourName(gameCard.assignedColourId)+"-1";

    const currentPlayerPropertyCardsGroupedByGroupId = foundCards.reduce((dict, propertyPileCard) => {
        if(dict[propertyPileCard.groupId])
            dict[propertyPileCard.groupId].push(propertyPileCard)
        else
            dict[propertyPileCard.groupId]=[propertyPileCard];
        return dict;
    },[]);
    const cardGroups = Object.values(currentPlayerPropertyCardsGroupedByGroupId);
    for (var i=0; i<cardGroups.length;i++){
        
        //there's room in this set.
        if(cardGroups[i].length < cardGroups[i][0].assignedColourDetails.numberNeededToCompleteSet)
            return  cardGroups[i][0].groupId;
    }
 

    //default:increment group id based on colour
    return `${getColourName(foundCards[0].assignedColourId)}-${parseInt(foundCards[0].groupId.split("-")[1])+1}`;
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