import React from 'react'
import logo from '../../assets/img/spinner.png'
import styled,{keyframes} from 'styled-components'
import {device} from "../../common/devices";


const transform = keyframes`
  0%{
    transform: scale(1, 1);
  }
  25%{
    transform: scale(1.2, 1.2);
  }
  50%{
    transform: scale(1.3, 1.3);
  }
  75%{
    transform: scale(1.2, 1.2);
  }
  100%{
    transform: scale(1, 1);
  }
`;

const StyledLoaderContainer = styled.div`
    animation: ${transform} 3s linear infinite;
    align-self:center;
    justify-self:center;
    color:white;
`;

const StyledLoaderText = styled.div`
    font-size:1.35em;
`;

const StyledSpinner = styled.img`
 

  @media ${device.medium} { 
    height:80%;
    width:80%;
  }
  @media ${device.small} { 
    height:70%;
    width:70%;
  }
`


export const MonopolySpinner = () => {
    return (
        <StyledLoaderContainer>
            <StyledSpinner src={logo}/>
            <StyledLoaderText>Loading....</StyledLoaderText>
        </StyledLoaderContainer>
    )
}

