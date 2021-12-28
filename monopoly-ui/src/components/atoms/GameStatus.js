import React from 'react'
import styled from 'styled-components'
import {device} from '../../common/devices'
import {GameStatusEnum} from '../../common/constants'

const getBackgroundColour = (gameStatus)=>{
    switch(gameStatus){
        case GameStatusEnum.WaitingToStart:
            return "#68a84f";
        case GameStatusEnum.InProgress:
            return "#f1c232";
        case GameStatusEnum.Completed:
            return "#e06666";
    }
}



const StyledMesssageField = styled.div`
    color: #fff;
    border: 1px solid #fff;
    padding: 2px;
    text-align: center;
    background-color:${(props) => getBackgroundColour(props.gameStatus)};
    
`

export const GameStatus = ({gameStatus})=> {

    const GameStatus = {
        0:"Waiting To Start",
        1:"In Progress",
        2:"Completed"
    }
  
    return (
        <StyledMesssageField gameStatus={gameStatus}>
           {GameStatus[gameStatus]}
        </StyledMesssageField>
    )
}


