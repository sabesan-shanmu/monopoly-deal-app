import React from 'react'
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel'
import { MonopolyDealButton } from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import { VoteStatusEnum } from '../../common/constants'



const StartGameContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color:white;
` 
export const StartGameScreen = ({mainStartGameFirstLabel,startGameBtn,mainStartGameSecondLabel,waitingForPlayerOneLabel,waitingforAllPlayersLabel,currentPlayer,players}) =>{
    
    const playersTotal = players.length;
    const readytoStartTotal = players.filter(t=>t.voteStatusId == VoteStatusEnum.Accepted).length;
    
    const showMainStartMessage = playersTotal == readytoStartTotal && currentPlayer.playerGameOrder == 1;
    const showStartMessage = playersTotal == readytoStartTotal && currentPlayer.playerGameOrder != 1;
    let startGameBody;

    if(showMainStartMessage)
        startGameBody=<React.Fragment>
            <MonopolyDealLabel {...mainStartGameFirstLabel} />
            <MonopolyDealButton {...startGameBtn} />
            <MonopolyDealLabel {...mainStartGameSecondLabel} />
        </React.Fragment>;
    else if(showStartMessage)
        startGameBody=<MonopolyDealLabel {...waitingForPlayerOneLabel} />
    else
        startGameBody=<MonopolyDealLabel {...waitingforAllPlayersLabel} />
    
        return (
        <StartGameContainer>
            {startGameBody}
        </StartGameContainer>
    )
}
