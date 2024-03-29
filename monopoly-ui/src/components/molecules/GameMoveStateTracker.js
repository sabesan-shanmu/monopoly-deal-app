import React,{useEffect,useContext} from 'react'
import { GameMoveStatusEnum,TransactionTrackerStatusEnum,PayeeTransactionStatusEnum } from '../../common/constants'
import { MonopolyDealButton } from '../atoms/MonopolyDealButton'
import styled from 'styled-components';
import { gameMoveApi } from '../../api/gameMoveApi';
import { preMoveCheckApi } from '../../api/preMoveCheckApi';
import { inPlayMoveCheckApi } from '../../api/inPlayMoveCheckApi';
import { selectionMoveCheckApi } from '../../api/selectionMoveCheckApi';
import { propertyMoveCheckApi } from '../../api/propertyMoveCheckApi';
import { PreMoveCheckContext } from '../../context/PreMoveCheckContext';
import { InPlayMoveCheckContext } from '../../context/InPlayMoveCheckContext';
import { SelectionMoveCheckContext } from '../../context/SelectionMoveCheckContext';
import { PropertyMoveCheckContext } from '../../context/PropertyMoveCheckContext'
import {CurrentPlayerCardsContext} from '../../context/CurrentPlayerCardsOnHandContext'
import { ResourceTypes,ActionTypesEnum } from '../../common/constants';
import { completeOthersAcknowledgeSequence } from '../../common/GameMoveHelpers';

const StyledStartChoiceHeader = styled.div`
    margin-top:5px;
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    align-items: center;
    width:100%;
    &>button{
        flex:2;
        max-width:200px;
        margin:2px;
    }
`;


export const GameMoveStateTracker = ({gameMove,game,player})=>{
    const {preMoveCheckState,preMoveCheckStateDispatch} = useContext(PreMoveCheckContext);
    const {inPlayMoveCheckState,inPlayMoveCheckStateDispatch} = useContext(InPlayMoveCheckContext);
    const {selectionMoveCheckState,selectionMoveCheckStateDispatch} = useContext(SelectionMoveCheckContext);
    const {propertyMoveCheckState,propertyMoveCheckStateDispatch} = useContext(PropertyMoveCheckContext);
    const {currentPlayerCardsState,currentPlayerCardsStateDispatch} = useContext(CurrentPlayerCardsContext);
    
    //all transactions must be resolved to show complete button
    const transactionsComplete = gameMove.transactionTracker && gameMove.transactionTracker?.tradePayeeTransactions && 
            gameMove.transactionTracker?.tradePayeeTransactions.length > 0 &&
            (gameMove.transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.NotPaid)).length==0;
    
    
    const startTurnBtn = {
        label:"Start Move",
        disabled:gameMove.numberOfMovesPlayed>0 && currentPlayerCardsState.playerCards.length == 0?true:false,
        onClick:(e)=>{
            let payload = {
                gameMoveStatus:GameMoveStatusEnum.MoveInProgress,
                currentPlayerId:gameMove.currentPlayer.playerId
            };

            gameMoveApi.patch(game.links.gameMoves,player.accessToken,payload)
            .then(function(success){
                console.log(success.data);
            })
            .catch(function(error){
                console.log(error.response.data);
            })
        }
    }
    const completeTurnBtn = {
        label:"Complete Turn",
        onClick:(e)=>{
            completeOthersAcknowledgeSequence(game,gameMove.transactionTracker,player)
        }
    }
    
    const drawCardsBtn = {
        label:"Start Move",
        onClick:(e)=>{
            let payload = {
                gameMoveStatus:GameMoveStatusEnum.DrawTwoCardsInProgress,
                currentPlayerId:gameMove.currentPlayer.playerId
            };

            gameMoveApi.patch(game.links.gameMoves,player.accessToken,payload)
            .then(function(success){
                console.log(success.data);
            })
            .catch(function(error){
                console.log(error.response.data);
            })
        }
    }
    
    const skipTurnBtn = {
        label:"End Turn",
        onClick:(e)=>{
            let payload = { 
                gameMoveStatus:gameMove.numberOfMovesPlayed<2?GameMoveStatusEnum.SkipYourTurn:GameMoveStatusEnum.MoveComplete,
                currentPlayerId:gameMove.currentPlayer.playerId
            };

            gameMoveApi.patch(game.links.gameMoves,player.accessToken,payload)
            .then(function(success){
                console.log(success.data);
            })
            .catch(function(error){
                console.log(error.response.data);
            })
        }
    }

    useEffect(() => {
        if(gameMove.gameMoveStatus == GameMoveStatusEnum.MoveInProgress && !gameMove.transactionTracker){
            preMoveCheckApi.get(game.links.preMoveCheck,player.accessToken)
                .then(success =>preMoveCheckStateDispatch({type:ResourceTypes.LoadResource,listOfPossibleMoves:success.data}))
                .catch(error=>{
                    console.log(error.response.data); 
                    preMoveCheckStateDispatch({type:ResourceTypes.LoadResource,listOfPossibleMoves:[]})
                })
        }
        if(gameMove.transactionTracker?.transactionTrackerStatus == TransactionTrackerStatusEnum.CurrentPlayerSelection)
        {
            inPlayMoveCheckApi.get(game.links.inPlayMoveCheck,player.accessToken)
                .then(success =>inPlayMoveCheckStateDispatch({type:ResourceTypes.LoadResource,listOfPossibleMoves:success.data}))
                .catch(error=>{
                    console.log(error.response.data);
                    inPlayMoveCheckStateDispatch({   
                            type:ResourceTypes.LoadResource,
                            listOfPossibleMoves:{
                                selectablePlayers:[],
                                selectableCards:[]
                            }
                        })
                })        
            
        }
        
        if(gameMove.transactionTracker?.transactionTrackerStatus == TransactionTrackerStatusEnum.OtherPlayerSelection)
        {
            selectionMoveCheckApi.get(game.links.selectionMoveCheck,player.accessToken)
                .then(success =>selectionMoveCheckStateDispatch({type:ResourceTypes.LoadResource,listOfPossibleMoves:success.data}))
                .catch(error=>{
                    console.log(error.response.data);
                    selectionMoveCheckStateDispatch({   
                            type:ResourceTypes.LoadResource,
                            listOfPossibleMoves:{
                                selectablePlayers:[],
                                selectableCards:[]
                            }
                        })
                })
        }
        if(gameMove.gameMoveStatus == GameMoveStatusEnum.MoveInProgress ||
            gameMove.transactionTracker?.transactionTrackerStatus == TransactionTrackerStatusEnum.OthersAcknowledge)
        {
            propertyMoveCheckApi.get(game.links.propertyMoveCheck,player.accessToken)
                .then(success =>propertyMoveCheckStateDispatch({type:ResourceTypes.LoadResource,listOfPossibleMoves:success.data}))
                .catch(error=>{
                    console.log(error.response.data);
                    propertyMoveCheckStateDispatch({   
                            type:ResourceTypes.LoadResource,
                            listOfPossibleMoves:[]
                        })
                })

        }

    },[gameMove])


    const getMessage = (gameMove) =>{

        const actionType = gameMove?.transactionTracker?.actionType;
        const transactionTrackerStatus = gameMove?.transactionTracker?.transactionTrackerStatus;
        switch(transactionTrackerStatus){
            case TransactionTrackerStatusEnum.InProgress:
                switch(actionType){
                    case ActionTypesEnum.PassGo:
                        return "Click on Draw Card Pile to draw 2 cards";
                    default: 
                        return "Move In Progress";
                }
            case TransactionTrackerStatusEnum.CurrentPlayerSelection:
                switch(actionType){
                    case ActionTypesEnum.SinglePlayerRent:
                    case ActionTypesEnum.MultiplePlayerRent:
                    case ActionTypesEnum.DoubleTheRent:
                        return "Select Property Card from your property pile that matches the Rent Card Colour scheme";
                    case ActionTypesEnum.ForcedDeal:
                        return "Select Property Card from your property pile that is not part of a complete set";
                    default: 
                        return "";
                }
            case TransactionTrackerStatusEnum.OtherPlayerSelection:
                switch(actionType){
                    case ActionTypesEnum.SinglePlayerRent:
                    case ActionTypesEnum.DoubleTheRent:
                        return "Choose One Player to pay Rent";
                    case ActionTypesEnum.DebtCollector: 
                        return "Choose One Player to pay Debt"
                    case ActionTypesEnum.DealBreaker: 
                        return "Select Propety Card  from a player's property pile that is part of a complete set";
                    case ActionTypesEnum.ForcedDeal:
                    case ActionTypesEnum.SlyDeal:
                        return "Select Property Card from a player's property pile that is not part of a complete set";
                    default: 
                        return "";
                }
            default:
                return "";
        }

    }


    return (
        <div>
            {gameMove.numberOfMovesPlayed == 0 && gameMove.gameMoveStatus == GameMoveStatusEnum.WaitingForPlayerToBeginMove &&
                <StyledStartChoiceHeader>
                    <MonopolyDealButton {...drawCardsBtn}/>
                     -OR-
                    <MonopolyDealButton {...skipTurnBtn} />
                </StyledStartChoiceHeader>
            }
            {gameMove.numberOfMovesPlayed != 0 && (gameMove.gameMoveStatus == GameMoveStatusEnum.WaitingForPlayerToBeginMove 
                || gameMove.gameMoveStatus == GameMoveStatusEnum.MoveComplete) &&
                <StyledStartChoiceHeader>
                    <MonopolyDealButton {...startTurnBtn}/>
                     -OR-
                    <MonopolyDealButton {...skipTurnBtn} />
                </StyledStartChoiceHeader>
            }
            {gameMove.gameMoveStatus == GameMoveStatusEnum.DiscardExtraCards &&
                <StyledStartChoiceHeader>
                    <MonopolyDealButton {...skipTurnBtn}/>
                </StyledStartChoiceHeader>
            }
            {gameMove.gameMoveStatus == GameMoveStatusEnum.MoveInProgress && !gameMove?.transactionTracker &&
                <React.Fragment>Select a card to play from your hand or move cards in your property pile</React.Fragment>
            }
            {gameMove.gameMoveStatus == GameMoveStatusEnum.MoveInProgress && gameMove?.transactionTracker &&
                <React.Fragment>{getMessage(gameMove)}</React.Fragment>
            }
            {gameMove.gameMoveStatus == GameMoveStatusEnum.MoveInProgress &&
                gameMove?.transactionTracker &&
                gameMove?.transactionTracker.transactionTrackerStatus == TransactionTrackerStatusEnum.OthersAcknowledge &&
                transactionsComplete &&
                <React.Fragment>
                    Move cards in your property pile or end your turn
                    <StyledStartChoiceHeader>
                        <MonopolyDealButton {...completeTurnBtn}/>
                    </StyledStartChoiceHeader>
                </React.Fragment>
            }
            
        </div>
    )
}
