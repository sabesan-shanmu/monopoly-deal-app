import React from 'react'
import PropTypes from 'prop-types';
import {MainLogoImage} from '../atoms/MainLogoImage'
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

export const GameTitleMenu = ({newGameOnClick,selectGameOnClick})=> {
    
    const newGame = {
        onClick:newGameOnClick,
        label:"New Game"
    }
    const selectGame ={
        onClick:selectGameOnClick,
        label:"Select Game"
    }

    return (
        <StyledMenuContainerForm>
            
            <MainLogoImage  />
        
            <StyledGameTitleMenuBody>
                <MonopolyDealButton {...newGame} />
                <MonopolyDealButton {...selectGame} /> 
            </StyledGameTitleMenuBody>
            
        </StyledMenuContainerForm>
    )
}

