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




export const NewGameMenu = ({cancelOnClick,createOnClick}) => {

    const gameinput = {
        mode: "text",
        label: "Game",
        minLength:2,
        maxLength:30,
        placeholder:"Enter Name..."
    }

    const cancel = {
        onClick:cancelOnClick,
        label:"Cancel"
    }
    const create = {
        onClick:createOnClick,
        label:"Create"
    }
    

    return (
        <StyledMenuContainer>
          
            <MonopolyDealInputField {...gameinput} />

            <StyledGameTitleMenuBody>
                <MonopolyDealButton  {...cancel} />
                <MonopolyDealButton  {...create} /> 
            </StyledGameTitleMenuBody>
            
        </StyledMenuContainer>
    )
}

