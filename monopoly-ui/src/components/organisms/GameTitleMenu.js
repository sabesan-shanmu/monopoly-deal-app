import React from 'react'
import PropTypes from 'prop-types';
import {MainLogoImage} from '../atoms/MainLogoImage'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {StyledMenuContainer} from "../atoms/StyledMenuContainer";



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

const StyledFooter= styled.a`
    margin-top:5px;
    color:white;
    font-size:1.35em;
    line-height: 1.35em;
`

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
        <StyledMenuContainer>
            
            <MainLogoImage  />
        
            <StyledGameTitleMenuBody>
                <MonopolyDealButton {...newGame} />
                <MonopolyDealButton {...selectGame} /> 
            </StyledGameTitleMenuBody>
            
            <StyledFooter target="_blank" href="http://monopolydealrules.com">How To Play</StyledFooter>
        </StyledMenuContainer>
    )
}

