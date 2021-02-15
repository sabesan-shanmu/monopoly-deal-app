import React from 'react'
import PropTypes from 'prop-types';
import {MainLogoImage} from '../atoms/MainLogoImage'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {device} from "../../common/devices"; 

const StyledGameTitleMenu = styled.main`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    padding: 10px;
    background-image: url("../../assets/img/modal-background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border:2px solid black;
    border-radius:5px;
    height:250px;

    @media ${device.desktop} {
        max-width: 600px;
    }
      
    @media ${device.tablet} { 
        
        max-width: 450px;
    }
  
    @media ${device.mobile} { 
        max-width: 300px;
    } 
`;


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
        <StyledGameTitleMenu>
            
            <MainLogoImage  />
        
            <StyledGameTitleMenuBody>
                <MonopolyDealButton {...left} />
                <MonopolyDealButton {...right} /> 
            </StyledGameTitleMenuBody>
            
        </StyledGameTitleMenu>
    )
}

