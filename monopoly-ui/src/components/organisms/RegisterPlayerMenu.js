import React from 'react'
import {MonopolyDealButton} from './../atoms/MonopolyDealButton'
import {MonopolyDealInputField} from './../atoms/MonopolyDealInputField'
import {MonopolyDealDropdown} from './../atoms/MonopolyDealDropdown'
import {CharacterImage} from './../atoms/CharacterImage'
import { FormError } from '../atoms/FormError'
import styled from 'styled-components'


const StyledLoginHeader = styled.div`  
    text-align: center;
    width:100%;
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
        margin:2px;
    }
`;

export const RegisterPlayerMenu = ({cancelBtn,registerBtn,userNameInputText,passwordInputText,characterSelectionDropdown,imageId,errors}) =>{


    return (
        <React.Fragment>
                    <StyledLoginHeader>
                        <MonopolyDealInputField {...userNameInputText}/>
                        <MonopolyDealInputField {...passwordInputText}/>
                        <MonopolyDealDropdown {...characterSelectionDropdown}/>
                        <CharacterImage imageId={imageId}></CharacterImage>
                        {errors &&
                            <FormError errors={errors}/>
                        } 
                    </StyledLoginHeader>
                    <StyledLoginFooter>
                        <MonopolyDealButton {...cancelBtn} />
                        <MonopolyDealButton {...registerBtn} /> 
                    </StyledLoginFooter>
        </React.Fragment>
      
    )
}


