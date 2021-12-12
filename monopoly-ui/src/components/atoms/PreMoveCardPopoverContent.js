import React,{useContext} from 'react'
import styled from 'styled-components'
import {startNoActionSequence,rotateCard,startPropertyActionSequence} from '../../common/GameMoveHelpers'
import { GameContext } from '../../context/GameContext'
import {PlayerContext} from '../../context/PlayerContext'
import { GameCardLocationStatusEnum } from '../../common/constants'

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

                        case 1:
                        case 24: 
                        case 25: 
                        case 26: 
                        case 27: 
                        case 28: 
                        case 29: 
                        case 30: 
                        case 31:
                        case 32:
                        case 33: 
                            startPropertyActionSequence(gameState.game,playerState.player,gameCard,move);
                            break;
                        case 2:
                        case 3:
                        case 4:
                        case 8:
                        case 9:
                        case 11:
                        case 12:
                        case 14:
                        case 16:
                        case 17:
                        case 19:
                        case 21:
                        case 23:        
                            startNoActionSequence(gameState.game,playerState.player,gameCard,move);
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

