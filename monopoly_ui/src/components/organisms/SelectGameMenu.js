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


export const SelectGameMenu = ({games,...props}) => { 
    
    const back = {
        onClick:null,
        label:"Go Back"
    }

    return (
        <StyledMenuContainer>
            
            <GameEntries games={games} onClick={null} /> 
            
            <StyledJoinGameMenuBody>
                <MonopolyDealButton {...back} />
            </StyledJoinGameMenuBody>
        </StyledMenuContainer>
    )
}

