import {transactionTrackerApi,singleTransactionTrackerApi} from '../api/transactionTrackerApi' 
import {gameCardsApi} from '../api/gameCardsApi'
import {gameMoveApi} from '../api/gameMoveApi'
import {tradePayeeTransactionApi} from '../api/tradePayeeTransactionApi';
import {GameMoveStatusEnum,ColoursEnum,TransactionTrackerStatusEnum,ActionTypesEnum,CardTypesEnum,PayeeTransactionStatusEnum} from './constants';
import { getCurrentPlayerPropertyPileCards,getColourName,getRentCost } from './GameHelpers';


export const startItsMyBirthdayActionSequnece = (game,currentPlayer,gameCard,move,currentPlayerCards) =>{
    console.log("Started startItsMyBirthdayActionSequnece!");
    let createdTransaction = {};
    //1. create transaction tracker
    const transactionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:currentPlayer.playerId,
        gamePlayActionId:move.gamePlayActionId,
        gameCardId:gameCard.gameCardId,
        transactionTrackerStatus:TransactionTrackerStatusEnum.OthersAcknowledge,
        actionType:move.actionType,
        requestedTotal:gameCard.card.action.transactionCost
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
         //3.create trade payee transactions
         const payeeTradeTranactionPayload = [];
         const otherPlayers = game.players.filter(p=>p.playerId!=currentPlayer.playerId);
         otherPlayers.forEach(player=>{
         
             payeeTradeTranactionPayload.push({
                 transactionTrackerId:createdTransaction.transactionTrackerId,
                 gamePassCode:game.gamePassCode,
                 targetPlayerId:player.playerId,
                 actionType:createdTransaction.actionType,
                 payeeTransactionStatus:PayeeTransactionStatusEnum.NotPaid
             });
         });

         return tradePayeeTransactionApi.post(createdTransaction.links.tradePayeeTransaction,currentPlayer.accessToken,payeeTradeTranactionPayload); 

    })
    .then((success)=>{
        console.log(success.data);
        console.log("Partially Completed startItsMyBirthdayActionSequnece!");
    })
    .catch((error)=>{
        console.log(error.response.data)
    }); 

}

export const startDebtCollectorOrSlyDealorDealBreakerActionSequnece = (game,currentPlayer,gameCard,move,currentPlayerCards) =>{
    console.log("Started startDebtCollectorOrSlyDealActionSequnece!");
    let createdTransaction = {};
    //1. create transaction tracker
    const transactionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:currentPlayer.playerId,
        gamePlayActionId:move.gamePlayActionId,
        gameCardId:gameCard.gameCardId,
        transactionTrackerStatus:TransactionTrackerStatusEnum.OtherPlayerSelection,
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
        console.log("Partially Completed startDebtCollectorOrSlyDealActionSequnece!");
    })
    .catch((error)=>{
        console.log(error.response.data)
    }); 

}



export const startDoubleTheRentActionSequence = (game,currentPlayer,gameCard,move,currentPlayerCards) =>{
    console.log("Started startDoubleTheRentActionSequence!");
    //1.find the double the rent card 
    const doubleTheRentGameCard = currentPlayerCards.find(t=> t.card.cardType == CardTypesEnum.Action && t.card.action.actionType == ActionTypesEnum.DoubleTheRent);
    
    let createdTransaction = {};
    //2. create transaction tracker
    const transactionTrackerPayload = {
        gamePassCode:game.gamePassCode,
        performedByPlayerId:currentPlayer.playerId,
        gamePlayActionId:move.gamePlayActionId,
        gameCardId:doubleTheRentGameCard.gameCardId,
        transactionTrackerStatus:TransactionTrackerStatusEnum.InProgress,
        actionType:move.actionType
    };
    transactionTrackerApi.post(game.links.transactionTracker,currentPlayer.accessToken,transactionTrackerPayload)
    .then((success)=>{
        console.log(success.data);
        createdTransaction = success.data
        //3. move the card
        const gameCardPayload = {
            gameCardId:doubleTheRentGameCard.gameCardId,
            cardLocationStatus:move.expectedGameCardLocation,
            groupId:doubleTheRentGameCard.groupId,
            assignedColourId:doubleTheRentGameCard.assignedColourId,
            isCardRightSideUp:doubleTheRentGameCard.isCardRightSideUp
        };
        return gameCardsApi.patch(doubleTheRentGameCard.links.self,currentPlayer.accessToken,gameCardPayload);
        
    }) 
    .then((success)=>{
        console.log(success.data)
        //4. patch the transaction tracker to complete
        const singletransactionTrackerPayload = {
            transactionTrackerId:createdTransaction.transactionTrackerId,
            transactionTrackerStatus:TransactionTrackerStatusEnum.Completed
        };
        return singleTransactionTrackerApi.patch(createdTransaction.links.self,currentPlayer.accessToken,singletransactionTrackerPayload);

    })
    .then((success)=>{
        console.log(success.data)
        //5. mark the move as complete 
        const movePayload = {
            gameMoveStatus:GameMoveStatusEnum.MoveComplete,
            currentPlayerId:currentPlayer.playerId
        };
        return gameMoveApi.patch(game.links.gameMoves,currentPlayer.accessToken,movePayload);

    })
    .then((success)=>{
        console.log(success.data);
        let payload = {
            gameMoveStatus:GameMoveStatusEnum.MoveInProgress,
            currentPlayerId:currentPlayer.playerId
        };
        //6.start new turn 
        gameMoveApi.patch(game.links.gameMoves,currentPlayer.accessToken,payload)
    })
    .then(function(success){
        console.log(success.data);
        //7.play the rent card
        return startRentorForcedDealActionSequence(game,currentPlayer,gameCard,move)
    })
    .then(function(success){
        console.log(success.data);
        console.log("Partially Completed startDoubleTheRentActionSequence!");
    })
    .catch((error)=>{console.log(error.response.data)});
}

export const startRentorForcedDealActionSequence = (game,currentPlayer,gameCard,move) =>{
    console.log("Started startRentorForcedDealActionSequence!");
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
        console.log("Partially Completed startRentorForcedDealActionSequence!");
    })
    .catch((error)=>{
        console.log(error.response.data)
    }); 

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
        console.log("Partially Completed startNoActionSequence!");
    })
    .catch((error)=>{
        console.log(error.response.data)
    }); 
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
    console.log("Started updateInPlayTransactionTracker!");
    const propertyPileCards = getCurrentPlayerPropertyPileCards(game,currentPlayer);
    const transactionTracker = gameMove.transactionTracker;
     /*
        Cards in play: 
        Single Rent - Select Card
        Single Rent(Double) - Select Card
        Multiple Rent - Select Card + auto select other players
        Multiple Rent(Double) - Select Card + auto select other players
        Forced Deal - Select Card 
    */

    //1. update transaction tracker
    const updatedTransactionTrackerPayload = {
        transactionTrackerId:transactionTracker.transactionTrackerId,
        transactionTrackerStatus:transactionTracker?.gameCard?.card?.rent?.actionType == ActionTypesEnum.MultiplePlayerRent ? TransactionTrackerStatusEnum.OthersAcknowledge:TransactionTrackerStatusEnum.OtherPlayerSelection,
        requestedColourId:transactionTracker.actionType != ActionTypesEnum.ForcedDeal?gameCard.assignedColourId:null,
        requestedTotal:transactionTracker.actionType != ActionTypesEnum.ForcedDeal? getRentCost(gameCard,propertyPileCards)*(transactionTracker.actionType == ActionTypesEnum.DoubleTheRent?2:1):null,
        sendingGameCardId:transactionTracker.actionType == ActionTypesEnum.ForcedDeal?gameCard.gameCardId:null
    };
    
     //1. patch the transaction tracker 
    console.log(updatedTransactionTrackerPayload);
    
    singleTransactionTrackerApi.patch(transactionTracker.links.self,currentPlayer.accessToken,updatedTransactionTrackerPayload)
    .then((success)=>{
        console.log(success.data)
        if(transactionTracker?.gameCard?.card?.rent?.actionType == ActionTypesEnum.MultiplePlayerRent){
            //2.create trade payee transactions
            const payeeTradeTranactionPayload = [];
            const otherPlayers = game.players.filter(p=>p.playerId!=currentPlayer.playerId);
            otherPlayers.forEach(player=>{
            
                payeeTradeTranactionPayload.push({
                    transactionTrackerId:transactionTracker.transactionTrackerId,
                    gamePassCode:game.gamePassCode,
                    targetPlayerId:player.playerId,
                    actionType:transactionTracker.actionType,                    
                    payeeTransactionStatus:PayeeTransactionStatusEnum.NotPaid
                });
            });
            return tradePayeeTransactionApi.post(transactionTracker.links.tradePayeeTransaction,currentPlayer.accessToken,payeeTradeTranactionPayload); 
        }
    })
    .then((success)=>{
        
        console.log("Partially Completed updateInPlayTransactionTracker!");
    })
    .catch((error)=>{
        console.log(error.response.data)
    });

}


export const updateSelectionTransactionTracker = (game,currentPlayer,gameMove,selectedPlayerId,selectedGameCard) =>{
    console.log("Started updateSelectionTransactionTracker!");
    /*
        Cards in play: 
        Single Rent - Select Player
        Single Rent(Double) - Select Player
        Debt Collector - Select Player
        Forced Deal - Select Card + Player
        Deal Breaker - Select Card Player
        Sly Deal - Select Card + Player
    */
    const propertyPileCards = getCurrentPlayerPropertyPileCards(game,currentPlayer);
    const transactionTracker = gameMove.transactionTracker;

    //1. update transaction tracker
    const updatedTransactionTrackerPayload = {
        transactionTrackerId:transactionTracker.transactionTrackerId,
        transactionTrackerStatus:TransactionTrackerStatusEnum.OthersAcknowledge,
        requestedGroupId:transactionTracker.actionType == ActionTypesEnum.DealBreaker?selectedGameCard.groupId:null,
        requestedColourId:transactionTracker.actionType == ActionTypesEnum.DealBreaker?selectedGameCard.assignedColourId:null,
        requestedGameCardId:selectedGameCard && transactionTracker.actionType != ActionTypesEnum.DealBreaker?selectedGameCard.gameCard:null,
        requestedTotal:transactionTracker.actionType == ActionTypesEnum.DebtCollector?gameMove.transactionTracker.gameCard.card.action.transactionCost:null
    };
    singleTransactionTrackerApi.patch(transactionTracker.links.self,currentPlayer.accessToken,updatedTransactionTrackerPayload)
    .then((success)=>{
        console.log(success.data)
        
        //2.create trade payee transactions
        const payeeTradeTranactionPayload = [{
            transactionTrackerId:transactionTracker.transactionTrackerId,
            gamePassCode:game.gamePassCode,
            targetPlayerId:selectedPlayerId?selectedPlayerId:selectedGameCard.playerId,
            actionType:transactionTracker.actionType,
            payeeTransactionStatus:PayeeTransactionStatusEnum.NotPaid
        }]

        return tradePayeeTransactionApi.post(transactionTracker.links.tradePayeeTransaction,currentPlayer.accessToken,payeeTradeTranactionPayload); 
    })
    .then((success)=>{
        console.log(success.data);
        console.log("Partially Completed updateSelectionTransactionTracker!");
    })
    .catch((error)=>{console.log(error.response.data)});
}

export const rotateCard = (gameCard,currentPlayer) => {
    //1. rotate the card
    const gameCardPayload = {
        gameCardId:gameCard.gameCardId,
        isCardRightSideUp:!gameCard.isCardRightSideUp,
        assignedColourId:gameCard.assignedColourId == gameCard.card.properties.primaryColourId? gameCard.card.properties.secondaryColourId:gameCard.card.properties.primaryColourId,
        groupId:gameCard.groupId
    };
    gameCardsApi.patch(gameCard.links.self,currentPlayer.accessToken,gameCardPayload)
    .then((success)=>{console.log(success.data)})
    .catch((error)=>{
        console.log(error.response.data)
    });
}


export const moveCard = (gameCard,currentPlayer,gameCardmove) => {
    //1. move the card
    const gameCardPayload = {
        gameCardId:gameCardmove.gameCardId,
        isCardRightSideUp:gameCardmove.isCardRightSideUp,
        assignedColourId:gameCardmove.assignedColourId,
        groupId:gameCardmove.groupId
    };
    gameCardsApi.patch(gameCard.links.self,currentPlayer.accessToken,gameCardPayload)
    .then((success)=>{console.log(success.data)})
    .catch((error)=>{
        console.log(error.response.data)
    });
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
 

    //default:increment group id based on colour(starting a new set)
    return `${getColourName(foundCards[0].assignedColourId)}-${parseInt(foundCards[0].groupId.split("-")[1])+1}`;
}

