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

export const GameTitleMenu = ()=> {
    
    const left = {
        onClick:null,
        label:"New Game"
    }
    const right ={
        onClick:null,
        label:"Join Game"
    }

    return (
        <StyledMenuContainer>
            
            <MainLogoImage  />
        
            <StyledGameTitleMenuBody>
                <MonopolyDealButton {...left} />
                <MonopolyDealButton {...right} /> 
            </StyledGameTitleMenuBody>
            
        </StyledMenuContainer>
    )
}

