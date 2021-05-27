import React from 'react'
import {MonopolyDealButton} from './../atoms/MonopolyDealButton'
import {MonopolyDealInputField} from './../atoms/MonopolyDealInputField'
import {MonopolyDealDropdown} from './../atoms/MonopolyDealDropdown'
import {CharacterImage} from './../atoms/CharacterImage'

import styled from 'styled-components'


const StyledLoginHeader = styled.div`  
    text-align: center;
    &>div{
        margin-bottom:5px;
    }
`;


const StyledLoginFooter = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    width:100%;

    &>button{
        flex:2;
        max-width:200px;
    }
`;

export const RegisterPlayerMenu = ({cancelBtn,registerBtn,userNameInput,passwordInput,characterSelectionDropdown,imageId}) =>{


    return (
        <React.Fragment>
                    <StyledLoginHeader>
                        <MonopolyDealInputField {...userNameInput}/>
                        <MonopolyDealInputField {...passwordInput}/>
                        <MonopolyDealDropdown {...characterSelectionDropdown}/>
                        <CharacterImage imageId={imageId}></CharacterImage>
                    </StyledLoginHeader>
                    <StyledLoginFooter>
                        <MonopolyDealButton {...cancelBtn} />
                        <MonopolyDealButton {...registerBtn} /> 
                    </StyledLoginFooter>
        </React.Fragment>
      
    )
}


