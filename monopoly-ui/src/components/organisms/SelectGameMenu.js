import React, { useContext } from 'react';
import {GameEntries} from '../molecules/GameEntries'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {StyledMenuContainer} from "../atoms/StyledMenuContainer";
import {MonopolySpinner} from  '../atoms/MonopolySpinner'
import {GamesContext} from '../../context/GamesContext'

const StyledJoinGameMenuBody = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content:space-between;
    align-items:center;
    margin-top:10px;
`;


export const SelectGameMenu = ({backOnSelect,...props}) => { 
    
    const back = {
        onClick:backOnSelect,
        label:"Go Back"
    }

    const {games} = useContext(GamesContext);

    return (
        <React.Fragment>
            {!games &&
                <MonopolySpinner/>
            }
            {games &&
                <StyledMenuContainer>
                    <GameEntries games={games}  />   
                    <StyledJoinGameMenuBody>
                        <MonopolyDealButton {...back} />
                    </StyledJoinGameMenuBody>
                </StyledMenuContainer>
            }
        </React.Fragment>       
    )
}

