import React from 'react'
import styled from 'styled-components'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'


const StyledHeader = styled.header`
    top: 0;
    left: auto;
    right: 0;
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 35px;
    padding:5px;
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

