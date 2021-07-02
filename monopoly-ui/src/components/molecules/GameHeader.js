import React from 'react'
import styled from 'styled-components'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import img from "../../assets/img/backgrounds/modal-background.jpg";

const StyledHeader = styled.header`
    top: 0;
    left: auto;
    right: 0;
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding:5px;
    font-size:1.35em;
    &>div{
        text-align:right;
    }
`

export const GameHeader = () => {

   
    return (
        <StyledHeader>
            <div>                
                <MonopolyDealButton label="Logout" />
            </div>
        </StyledHeader>
    );
}

