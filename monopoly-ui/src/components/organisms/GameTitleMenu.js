import React from 'react'
import PropTypes from 'prop-types';
import {MainLogoImage} from '../atoms/MainLogoImage'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {StyledMenuContainer} from "../atoms/StyledMenuContainer";
import GitHubLogo from "../../assets/img/github-logo.png";

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
const StyledFooter= styled.div`
    margin-top:5px;
    display: flex;
    align-items:center;
    flex-direction:row;
    row-gap:1;
`
const StyledAnchor= styled.a`
    margin:5px;
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
            <StyledFooter>
                <StyledAnchor target="_blank" href="https://youtu.be/j6m51ukj_Bw">
                <img src="https://img.icons8.com/fluency/48/000000/youtube-play.png"/>
                Demo
                </StyledAnchor>
                <StyledAnchor target="_blank" href="https://github.com/sabesan-shanmu">
                <img src={GitHubLogo}/>
                Profile
                </StyledAnchor>
            </StyledFooter>
        </StyledMenuContainer>
    )
}

