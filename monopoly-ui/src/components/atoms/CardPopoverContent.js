import React,{useContext} from 'react'
import styled from 'styled-components'
import {startGameActionSequence} from '../../common/GameMoveHelpers'
import { GameContext } from '../../context/GameContext'
import {PlayerContext} from '../../context/PlayerContext'

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




export const CardPopoverContent = ({gameCard,listOfPossibleMoves,setIsPopoverOpen}) =>{
    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    console.log(listOfPossibleMoves);
    const gameCardId = listOfPossibleMoves.gameCardId;
    return (
        <StyledPopoverContent>
            <StyledPopoverHeader>Choose an Action:</StyledPopoverHeader>
            {listOfPossibleMoves.possibleMoves.map((move,key)=>
                <StyledPopoverBody key={key} onClick={()=>{
                    startGameActionSequence(gameState.game,playerState.player,gameCard,move);
                    //close popover
                    setIsPopoverOpen(false);
                }}>{move.description}</StyledPopoverBody>
            )}
        </StyledPopoverContent>
    )
}

