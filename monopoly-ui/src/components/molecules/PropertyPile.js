import React from 'react'
import styled from 'styled-components'
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';

const StyledBorder = styled.div`
    border:2px solid white;
    @media ${device.xlarge} {
        height:210px;
    }

    @media ${device.large} { 
        height:210px;
    }
    @media ${device.medium} { 
        height:210px;

    }
    @media ${device.small} { 
        height:210px;  
    }
`;

export const PropertyPile = () => {
    return (
        <React.Fragment>
            <MonopolyDealLabel type="h4" text="-Properties-" />
            <StyledBorder>
            </StyledBorder>
        </React.Fragment>
        
    )
}
