import React from 'react'
import styled from 'styled-components'
import {getGameMoveName} from '../../common/GameMoveHelpers'

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




export const CardPopoverContent = ({listOfPossibleMoves}) =>{
    console.log(listOfPossibleMoves);
    const gameCardId = listOfPossibleMoves.gameCardId;
    return (
        <StyledPopoverContent>
            <StyledPopoverHeader>Choose an Action:</StyledPopoverHeader>
            {listOfPossibleMoves.possibleMoves.map((move,key)=>
                <StyledPopoverBody key={key}>{move.description}</StyledPopoverBody>
            )}
        </StyledPopoverContent>
    )
}

