import React from 'react'
import PropTypes from 'prop-types';
import {StyledMenuForm} from "../atoms/StyledMenuForm";
import {LoginPlayerMenu} from "../organisms/LoginPlayerMenu"

import styled from 'styled-components'


const StyledSpan = styled.div`
    font-size: 20px;
`


export const JoinGameTemplate = (joinGameMenu)=> {
   
   

    return (
        <StyledMenuForm>
        

            <StyledSpan>--OR--</StyledSpan>
            <LoginPlayerMenu 
                cancelBtn={joinGameMenu.cancelBtn}
                loginBtn={joinGameMenu.loginBtn}
                userNameInput={joinGameMenu.userNameInput}
                passwordInput={joinGameMenu.passwordInput}
            />
            
        </StyledMenuForm>
    )
}

