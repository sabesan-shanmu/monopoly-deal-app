import React, { useContext } from 'react';
import {GameEntries} from '../molecules/GameEntries'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {StyledMenuContainerForm} from "../atoms/StyledMenuContainerForm";
import {MonopolySpinner} from  '../atoms/MonopolySpinner'
import {GamesContext} from '../../context/GamesContext'

const StyledJoinGameMenuBody = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content:space-between;
    align-items:center;
    margin-top:10px;
`;


export const SelectGameMenu = ({backBtn,...props}) => { 
    
   

    const {games} = useContext(GamesContext);

    return (
        <React.Fragment>
            {!games &&
                <MonopolySpinner/>
            }
            {games &&
                <StyledMenuContainerForm>
                    <GameEntries games={games}  />   
                    <StyledJoinGameMenuBody>
                        <MonopolyDealButton {...backBtn} />
                    </StyledJoinGameMenuBody>
                </StyledMenuContainerForm>
            }
        </React.Fragment>       
    )
}

