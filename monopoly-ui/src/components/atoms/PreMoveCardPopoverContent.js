import React,{useContext} from 'react'
import styled from 'styled-components'
import {startNoActionSequence,rotateCard,startPropertyActionSequence,startPassGoInPlayPileActionSequence} from '../../common/GameMoveHelpers'
import { GameContext } from '../../context/GameContext'
import {PlayerContext} from '../../context/PlayerContext'
import { GameCardLocationStatusEnum,GamePlayActionEnum } from '../../common/constants'

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
    console.log(listOfPossibleMoves);
    return (
        <StyledPopoverContent>
            <StyledPopoverHeader>Choose an Action:</StyledPopoverHeader>
            {listOfPossibleMoves?.possibleMoves.map((move,key)=>
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
                            break;
                        case GamePlayActionEnum.DoubleTheRentOnPlayPile:
                            break;
                        case GamePlayActionEnum.DebtCollectorOnPlayPile:
                            break;
                        case GamePlayActionEnum.ItsMyBirthdayOnPlayPile:
                            break
                        case GamePlayActionEnum.ForcedDealOnPlayPile:
                            break;
                        case GamePlayActionEnum.SlyDealOnPlayPile:
                            break;
                        case GamePlayActionEnum.DealBreakerOnPlayPile:
                            break;

                    }
                    //close popover
                    setIsPopoverOpen(false);
                }}>{move.description}</StyledPopoverBody>
            )}
            {gameCard?.card?.properties?.isRotatable && gameCard.cardLocationStatus == GameCardLocationStatusEnum.IsOnHand &&
                <StyledPopoverBody onClick = {()=>{
                    rotateCard(gameState.game,playerState.player,gameCard);
                }}>Rotate Card</StyledPopoverBody>
            }
        </StyledPopoverContent>
    )
}

