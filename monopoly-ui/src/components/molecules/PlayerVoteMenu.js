import React from 'react'
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel'
import { PlayerVoteStatus } from '../atoms/PlayerVoteStatus'
import styled from 'styled-components'


const PlayerVoteContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`    

export const PlayerVoteMenu = ({playerVoteLabel,playerVoteStatus}) => {
    return (
        <PlayerVoteContainer>
            <MonopolyDealLabel {...playerVoteLabel} />    
            <PlayerVoteStatus {...playerVoteStatus}/>
        </PlayerVoteContainer>
    )
}