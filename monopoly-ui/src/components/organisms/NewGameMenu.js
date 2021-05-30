import React,{useRef} from 'react'
import PropTypes from 'prop-types'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {MonopolyDealInputField} from '../atoms/MonopolyDealInputField'
import {MonopolyDealDropdown} from '../atoms/MonopolyDealDropdown'
import {MonopolyMessageField} from '../atoms/GameStatus'
import styled from 'styled-components'
import {device} from "../../common/devices"; 
import {StyledMenuForm} from "../atoms/StyledMenuForm";


const StyledNewGameHeader = styled.div`  
    &>div{
        margin-bottom:5px;
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


export const NewGameMenu = ({gameInputText,cancelBtn,createBtn,gameForm,gameModeDropdown}) => {

   
    return (
            <StyledMenuForm {...gameForm}>
                <StyledNewGameHeader>
                    <MonopolyDealInputField {...gameInputText} />
                    <MonopolyDealDropdown {...gameModeDropdown} />
                </StyledNewGameHeader>
                <StyledGameTitleMenuBody>
                    <MonopolyDealButton  {...cancelBtn} />
                    <MonopolyDealButton  {...createBtn} /> 
                </StyledGameTitleMenuBody>
            </StyledMenuForm>
    )
}

