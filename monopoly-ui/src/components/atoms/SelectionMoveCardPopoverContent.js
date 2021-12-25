import React,{useContext} from 'react'
import styled from 'styled-components'
import { GameContext } from '../../context/GameContext'
import {PlayerContext} from '../../context/PlayerContext'
import {CurrentPlayerCardsContext} from '../../context/CurrentPlayerCardsOnHandContext'
import {GameMoveContext} from '../../context/GameMoveContext'
import {ActionTypesEnum} from '../../common/constants'
import {updateSelectionTransactionTracker} from '../../common/GameMoveHelpers'
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




export const SelectionMoveCardPopoverContent = ({gameCard,listOfPossibleMoves,setIsPopoverOpen}) =>{
    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext);
    
    return (
        <StyledPopoverContent>
            <StyledPopoverHeader>Choose an Action:</StyledPopoverHeader>
            {listOfPossibleMoves.map((move,key)=>
                <StyledPopoverBody key={key} onClick={()=>{
                    updateSelectionTransactionTracker(gameState.game,playerState.player,gameMoveState.gameMove,null,gameCard);
                    //close popover
                    setIsPopoverOpen(false);
                }}>{move.description}</StyledPopoverBody>
            )}
        </StyledPopoverContent>
    )
}

