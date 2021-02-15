import React from 'react'
import {GameEntries} from './GameEntries'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {device} from "../../common/devices"; 



const StyledJoinGameMenu = styled.main`
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


    @media ${device.desktop} {
        max-width: 600px;
        height:400px;
    }
      
    @media ${device.tablet} { 
        max-width: 450px;
        height:250px;
    }
  
    @media ${device.mobile} { 
        max-width: 300px;
        height:200px;
    } 
`;


const StyledJoinGameMenuBody = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content:space-between;
    align-items:center;
    margin-top:10px;
`;


export const JoinGameMenu = ({games,...props}) => { 
    
    const back = {
        onClick:null,
        label:"Go Back"
    }

    return (
        <StyledJoinGameMenu>
            
            <GameEntries games={games} onClick={null} /> 
            
            <StyledJoinGameMenuBody>
                <MonopolyDealButton {...back} />
            </StyledJoinGameMenuBody>
        </StyledJoinGameMenu>
    )
}

