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
        margin:2px;
    }
`;

const StyledFooter= styled.a`
    margin-top:5px;
    color:white;
    font-size:1.35em;
    display: flex;
    align-items:center;
    cursor:pointer;
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
            
            <StyledFooter target="_blank" href="https://www.youtube.com/watch?v=w2o8LgIvWEg">
            <img src="https://img.icons8.com/fluency/48/000000/youtube-play.png"/>Demo
            </StyledFooter>
        </StyledMenuContainer>
    )
}

