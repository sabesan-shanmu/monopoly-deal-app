import React from 'react'
import PropTypes from 'prop-types'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {MonopolyDealInputField} from '../atoms/MonopolyDealInputField'
import styled from 'styled-components'
import {device} from "../../common/devices"; 
import {StyledMenuContainer} from "../atoms/StyledMenuContainer";




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
        <StyledMenuContainer>
          
            <MonopolyDealInputField {...gameinput} />

            <StyledGameTitleMenuBody>
                <MonopolyDealButton  {...left} />
                <MonopolyDealButton  {...right} /> 
            </StyledGameTitleMenuBody>
            
        </StyledMenuContainer>
    )
}

