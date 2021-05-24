import React from 'react'
import PropTypes from 'prop-types';
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {StyledMenuContainerForm} from "../atoms/StyledMenuContainerForm";



const StyledGameTitleMenuBody = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    width:100%;

    &>button{
        flex:2;
        max-width:200px;
    }
`;

export const JoinGameMenu = ()=> {
    
    const left = {
        onClick:null,
        label:"Register New Player"
    }
    const right ={
        onClick:null,
        label:"Login"
    }

    return (
        <StyledMenuContainerForm>
        
            <StyledGameTitleMenuBody>
                <MonopolyDealButton {...left} />
                <MonopolyDealButton {...right} /> 
            </StyledGameTitleMenuBody>
            
        </StyledMenuContainerForm>
    )
}

