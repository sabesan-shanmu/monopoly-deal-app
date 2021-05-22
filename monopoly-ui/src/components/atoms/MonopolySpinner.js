import React from 'react'
import logo from '../../assets/img/spinner.png'
import styled,{keyframes} from 'styled-components'



const transform = keyframes`
  0%{
    transform: scale(1, 1);
  }
  25%{
    transform: scale(1.5, 1.5);
  }
  50%{
    transform: scale(2, 2);
  }
  75%{
    transform: scale(1.5, 1.5);
  }
  100%{
    transform: scale(1, 1);
  }
`;

const StyledLoaderContainer = styled.div`
    animation: ${transform} 3s linear infinite;
`;

const StyledLoaderText = styled.div`
    font-size:20px;
`;


export const MonopolySpinner = () => {
    return (
        <StyledLoaderContainer>
            <img src={logo}/>
            <StyledLoaderText>Loading....</StyledLoaderText>
        </StyledLoaderContainer>
    )
}

