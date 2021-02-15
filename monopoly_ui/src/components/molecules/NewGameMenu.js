import React from 'react'
import PropTypes from 'prop-types'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {MonopolyDealInputField} from '../atoms/MonopolyDealInputField'
import styled from 'styled-components'
import {device} from "../../common/devices"; 
import img from "../../assets/img/backgrounds/modal-background.jpg";

const StyledNewGameMenu = styled.main`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    padding: 10px;
    background-image: url(${img});
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
    margin-top:20px;
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    width:100%;

    &>button{
        flex:2;
        max-width:200px;
    }
`;




export const NewGameMenu = () => {

    const gameinput = {
        mode: "text",
        label: "Game",
        maxLength:30,
        placeholder:"Enter Name..."
    }

    const left = {
        onClick:null,
        label:"Cancel"
    }
    const right = {
        onClick:null,
        label:"Create"
    }
    


    return (
        <StyledNewGameMenu>
          
            <MonopolyDealInputField {...gameinput} />

            <StyledGameTitleMenuBody>
                <MonopolyDealButton  {...left} />
                <MonopolyDealButton  {...right} /> 
            </StyledGameTitleMenuBody>
            
        </StyledNewGameMenu>
    )
}

