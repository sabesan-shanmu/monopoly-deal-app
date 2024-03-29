import React,{useContext} from 'react'
import styled from 'styled-components'
import {startNoActionSequence,
    rotateCard,
    discardCard,
    startPropertyActionSequence,
    startPassGoInPlayPileActionSequence,
    startRentorForcedDealActionSequence,
    startDoubleTheRentActionSequence,
    startDebtCollectorOrSlyDealorDealBreakerActionSequnece,
    startItsMyBirthdayActionSequnece
} from '../../common/GameMoveHelpers'
import { GameContext } from '../../context/GameContext'
import {PlayerContext} from '../../context/PlayerContext'
import { CurrentPlayerCardsContext } from '../../context/CurrentPlayerCardsOnHandContext'
import { GameMoveContext } from '../../context/GameMoveContext'
import { GameCardLocationStatusEnum,GamePlayActionEnum,GameMoveStatusEnum } from '../../common/constants'

const StyledPopoverContent = styled.div`
    width:115 px;
    color:white;
    border:1px solid white;
    padding:3px;
    border-radius:2px;
`;

const StyledPopoverHeader = styled.div`
    background-color:#382F2F;
    color:white;
`;

const StyledPopoverBody = styled.div`
    background-color:white;
    color:black;
    cursor:pointer;
    &:hover{
        background-color:#AFAFAF;
    }
`;




export const PreMoveCardPopoverContent = ({gameCard,listOfPossibleMoves,setIsPopoverOpen}) =>{
    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const {currentPlayerCardsState,currentPlayerCardsStateDispatch} = useContext(CurrentPlayerCardsContext);
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext);
    return (
        <StyledPopoverContent>
            <StyledPopoverHeader>Choose an Action:</StyledPopoverHeader>
            {listOfPossibleMoves?.possibleMoves && gameMoveState.gameMove.gameMoveStatus != GameMoveStatusEnum.DiscardExtraCards && listOfPossibleMoves?.possibleMoves.map((move,key)=>
                <StyledPopoverBody key={key} onClick={()=>{
                    
                    switch(move.gamePlayActionId)
                    {
                        case GamePlayActionEnum.PlayOnPropertyPile:
                        case GamePlayActionEnum.GreenOnPropertyPile: 
                        case GamePlayActionEnum.BrownOnPropertyPile: 
                        case GamePlayActionEnum.DarkBlueOnPropertyPile: 
                        case GamePlayActionEnum.LightBlueOnPropertyPile: 
                        case GamePlayActionEnum.OrangeOnPropertyPile: 
                        case GamePlayActionEnum.PinkOnPropertyPile: 
                        case GamePlayActionEnum.BlackOnPropertyPile: 
                        case GamePlayActionEnum.RedOnPropertyPile:
                        case GamePlayActionEnum.YellowOnPropertyPile:
                        case GamePlayActionEnum.NeutralOnPropertyPile: 
                            startPropertyActionSequence(gameState.game,playerState.player,gameCard,move);
                            break;
                        case GamePlayActionEnum.CashOnCashPile:
                        case GamePlayActionEnum.SingleRentOnCashPile:
                        case GamePlayActionEnum.MultipleRentOnCashPile:
                        case GamePlayActionEnum.HotelOnCashPile:
                        case GamePlayActionEnum.HouseOnCashPile:
                        case GamePlayActionEnum.PassGoOnCashPile:
                        case GamePlayActionEnum.DoubleTheRentOnCashPile:
                        case GamePlayActionEnum.ItsMyBirthdayCashPile:
                        case GamePlayActionEnum.DebtCollectorOnCashPile:
                        case GamePlayActionEnum.JustSayNoOnCashPile:
                        case GamePlayActionEnum.SlyDealOnCashPile:
                        case GamePlayActionEnum.ForcedDealOnCashPile:
                        case GamePlayActionEnum.DealBreakerOnCashPile:        
                            startNoActionSequence(gameState.game,playerState.player,gameCard,move);
                            break;
                        case GamePlayActionEnum.PassGoOnPlayPile:
                            startPassGoInPlayPileActionSequence(gameState.game,playerState.player,gameCard,move);
                            break;
                        case GamePlayActionEnum.SingleRentOnPlayPile:
                        case GamePlayActionEnum.MultipleRentOnPlayPile:
                        case GamePlayActionEnum.ForcedDealOnPlayPile:
                            startRentorForcedDealActionSequence(gameState.game,playerState.player,gameCard,move);
                            break;
                        case GamePlayActionEnum.DoubleTheRentOnPlayPile:
                            startDoubleTheRentActionSequence(gameState.game,playerState.player,gameCard,move,currentPlayerCardsState.playerCards);
                            break;
                        case GamePlayActionEnum.ItsMyBirthdayOnPlayPile:
                            startItsMyBirthdayActionSequnece(gameState.game,playerState.player,gameCard,move);
                            break
                        case GamePlayActionEnum.SlyDealOnPlayPile:
                        case GamePlayActionEnum.DebtCollectorOnPlayPile:
                        case GamePlayActionEnum.DealBreakerOnPlayPile:
                            startDebtCollectorOrSlyDealorDealBreakerActionSequnece(gameState.game,playerState.player,gameCard,move);
                            break;

                    }
                    //close popover
                    setIsPopoverOpen(false);
                }}>{move.description}</StyledPopoverBody>
            )}
            {listOfPossibleMoves?.possibleMoves && gameCard?.card?.properties?.isRotatable && gameMoveState.gameMove.gameMoveStatus != GameMoveStatusEnum.DiscardExtraCards && gameCard.cardLocationStatus == GameCardLocationStatusEnum.IsOnHand &&
                <StyledPopoverBody onClick = {()=>{
                    rotateCard(gameCard,playerState.player);
                }}>Rotate Card</StyledPopoverBody>
            }
            {gameMoveState.gameMove.gameMoveStatus == GameMoveStatusEnum.DiscardExtraCards && gameCard.cardLocationStatus == GameCardLocationStatusEnum.IsOnHand &&
                <StyledPopoverBody onClick = {()=>{
                    discardCard(gameCard,playerState.player);
                    //close popover
                    setIsPopoverOpen(false);
                }}>Discard Card</StyledPopoverBody>
            }
        </StyledPopoverContent>
    )
}

