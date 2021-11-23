import React from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';


const StyledInPlayPile = styled.div`
    min-width: 280px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    height:100%;
`;

const StyledBorder = styled.div`
    border:2px solid white;
    display:block;
    width: 240px;
    @media ${device.xlarge} {
        height:240px;
    }

    @media ${device.large} { 
        height:240px;
    }
    @media ${device.medium} { 
        height:240px;

    }
    @media ${device.small} { 
        height:240px;  
    }
`;


export const InPlayPile = () => {
    return (
        <StyledInPlayPile>
            <MonopolyDealLabel type="h4" text="-Card In Play Pile-" />
            <StyledBorder>
            </StyledBorder>
        </StyledInPlayPile>
    )
}
