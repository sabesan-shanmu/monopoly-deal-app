import React from 'react'
import {GameEntries} from '../molecules/GameEntries'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {StyledMenuContainer} from "../atoms/StyledMenuContainer";

const StyledJoinGameMenuBody = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content:space-between;
    align-items:center;
    margin-top:10px;
`;


export const SelectGameMenu = ({games,gameEntriesOnClick,backOnSelect,...props}) => { 
    
    const back = {
        onClick:backOnSelect,
        label:"Go Back"
    }

    return (
        <StyledMenuContainer>
            
            <GameEntries games={games} onClick={gameEntriesOnClick} /> 
            
            <StyledJoinGameMenuBody>
                <MonopolyDealButton {...back} />
            </StyledJoinGameMenuBody>
        </StyledMenuContainer>
    )
}

