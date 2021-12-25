import {transactionTrackerApi,singleTransactionTrackerApi} from '../api/transactionTrackerApi' 
import {gameCardsApi} from '../api/gameCardsApi'
import {gameMoveApi} from '../api/gameMoveApi'
import {GameMoveStatusEnum,ColoursEnum,TransactionTrackerStatusEnum,ActionTypesEnum,CardTypesEnum} from './constants';
import { getCurrentPlayerPropertyPileCards,getColourName,getRentCost } from './GameHelpers';

export const startDoubleTheRentActionSequence = (game,currentPlayer,gameCard,move,currentPlayerCards) =>{
    
    //1.find the double the rent card 
    const doubleTheRentGameCard = currentPlayerCards.find(t=> t.card.cardType == CardTypesEnum.Action && t.card.action.actionType == ActionTypesEnum.DoubleTheRent);
    //2.play double the rent card 
    return startNoActionSequence(game,currentPlayer,doubleTheRentGameCard,move)
        .then(function(){
            console.log("done!!!!");
            let payload = {
                gameMoveStatus:GameMoveStatusEnum.MoveInProgress,
                currentPlayerId:currentPlayer.playerId
            };
            return;
            //3.start new turn 
            gameMoveApi.patch(game.links.gameMoves,currentPlayer.accessToken,payload)
            .then(function(success){
                console.log(success.data);
                //4.play the rent card
                return startRentActionSequence(game,currentPlayer,gameCard,move)
            })
            .then(function(success){
                console.log(success.data);
            })
            .catch(function(error){
                console.log(error.response.data);
            })
            

        })
}

export const startRentActionSequence = (game,currentPlayer,gameCard,move) =>{
    console.log("Started startRentActionSequence!");
    let createdTransaction = {};
    //1. create transaction tracker
    const transactionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:currentPlayer.playerId,
        gamePlayActionId:move.gamePlayActionId,
        gameCardId:gameCard.gameCardId,
        transactionTrackerStatus:TransactionTrackerStatusEnum.CurrentPlayerSelection,
        actionType:move.actionType
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
        console.log("Partiallly Completed startRentActionSequence!");
    })
    .catch((error)=>{console.log(error.response.data)}); 

}

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
        transactionTrackerStatus:TransactionTrackerStatusEnum.InProgress,
        actionType:move.actionType
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
        transactionTrackerStatus:TransactionTrackerStatusEnum.InProgress,
        actionType:move.actionType
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


export const updateInPlayTransactionTracker = (game,currentPlayer,gameMove,gameCard) =>{
    
    const propertyPileCards = getCurrentPlayerPropertyPileCards(game,currentPlayer);
    const transactionTracker = gameMove.transactionTracker;

    //1. create transaction tracker
    const updatedTransactionTrackerPayload = {
        transactionTrackerId:transactionTracker.transactionTrackerId,
        transactionTrackerStatus:gameCard?.card?.rent?.actionType == ActionTypesEnum.MultiplePlayerRent ? TransactionTrackerStatusEnum.OthersAcknowledge:TransactionTrackerStatusEnum.OtherPlayerSelection,
        requestedRentColourId:transactionTracker.actionType != ActionTypesEnum.ForcedDeal?gameCard.assignedColourId:null,
        requestedTotal:transactionTracker.actionType != ActionTypesEnum.ForcedDeal? getRentCost(gameCard,propertyPileCards)*(transactionTracker.actionType == ActionTypesEnum.DoubleTheRent?2:1):null,
        sendingGameCardId:transactionTracker.actionType == ActionTypesEnum.ForcedDeal?gameCard.gameCardId:null
    };
    
     //1. patch the transaction tracker 
    console.log(updatedTransactionTrackerPayload);
    return;
    singleTransactionTrackerApi.patch(transactionTracker.links.self,currentPlayer.accessToken,updatedTransactionTrackerPayload)
    .then((success)=>{console.log(success.data)})
    .catch((error)=>{console.log(error.response.data)});

}




export const rotateCard = (game,currentPlayer,gameCard) => {
    //1. rotate the card
    const gameCardPayload = {
        gameCardId:gameCard.gameCardId,
        isCardRightSideUp:!gameCard.isCardRightSideUp,
        assignedColourId:gameCard.assignedColourId == gameCard.card.properties.primaryColourId? gameCard.card.properties.secondaryColourId:gameCard.card.properties.primaryColourId,
        groupId:gameCard.groupId
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

