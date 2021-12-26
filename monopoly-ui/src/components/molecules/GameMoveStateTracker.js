import React,{useEffect,useContext} from 'react'
import { GameMoveStatusEnum,TransactionTrackerStatusEnum } from '../../common/constants'
import { MonopolyDealButton } from '../atoms/MonopolyDealButton'
import styled from 'styled-components';
import { gameMoveApi } from '../../api/gameMoveApi';
import { preMoveCheckApi } from '../../api/preMoveCheckApi';
import { inPlayMoveCheckApi } from '../../api/inPlayMoveCheckApi';
import { selectionMoveCheckApi } from '../../api/selectionMoveCheckApi';
import { PreMoveCheckContext } from '../../context/PreMoveCheckContext';
import { InPlayMoveCheckContext } from '../../context/InPlayMoveCheckContext';
import { SelectionMoveCheckContext } from '../../context/SelectionMoveCheckContext';
import { ResourceTypes,ActionTypesEnum } from '../../common/constants';

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
    console.log({gameMove,game,player});
    const {preMoveCheckState,preMoveCheckStateDispatch} = useContext(PreMoveCheckContext);
    const {inPlayMoveCheckState,inPlayMoveCheckStateDispatch} = useContext(InPlayMoveCheckContext);
    const {selectionMoveCheckState,selectionMoveCheckStateDispatch} = useContext(SelectionMoveCheckContext);
    
    const startTurnBtn = {
        label:"Start Move",
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
        label:"Skip Turn",
        onClick:(e)=>{
            let payload = {
                gameMoveStatus:GameMoveStatusEnum.SkipYourTurn,
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
                        return "";
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
                return "Move In Progress";
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
            {gameMove.gameMoveStatus == GameMoveStatusEnum.MoveInProgress && !gameMove?.transactionTracker &&
                <React.Fragment>Select a card to play</React.Fragment>
            }
            {gameMove.gameMoveStatus == GameMoveStatusEnum.MoveInProgress && gameMove?.transactionTracker &&
                <React.Fragment>{getMessage(gameMove)}</React.Fragment>
            }
            
        </div>
    )
}
