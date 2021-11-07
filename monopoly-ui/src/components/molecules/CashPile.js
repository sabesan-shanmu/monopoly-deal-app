import React from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';

const StyledBorder = styled.div`
    border:2px solid white;
    @media ${device.xlarge} {
        height:180px;
    }

    @media ${device.large} { 
        height:180px;
    }
    @media ${device.medium} { 
        height:180px;

    }
    @media ${device.small} { 
        height:180px;  
    }
`;


export const CashPile = () => {
    return (
        <React.Fragment>
            <div>
                -Cash-
            </div>
            <StyledBorder>
            </StyledBorder>
        </React.Fragment>
    )
}
