import React from 'react'
import {MonopolyDealButton} from './../atoms/MonopolyDealButton'
import {MonopolyDealInputField} from './../atoms/MonopolyDealInputField'
import styled from 'styled-components'
import { FormError } from '../atoms/FormError'

const StyledLoginHeader = styled.div`  
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

export const LoginPlayerMenu = ({cancelBtn,loginBtn,userNameInputText,passwordInputText,errors}) =>{


    return (
        <React.Fragment>
                    <StyledLoginHeader>
                        <MonopolyDealInputField {...userNameInputText}/>
                        <MonopolyDealInputField {...passwordInputText}/>
                        {errors &&
                            <FormError errors={errors}/>
                        }  
                    </StyledLoginHeader>
                    <StyledLoginFooter>
                        <MonopolyDealButton {...cancelBtn} />
                        <MonopolyDealButton {...loginBtn} /> 
                    </StyledLoginFooter>
        </React.Fragment>
      
    )
}


