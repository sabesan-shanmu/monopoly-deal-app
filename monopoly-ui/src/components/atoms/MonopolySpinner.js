import React from 'react'
import logo from '../../assets/img/spinner.png'
import styled,{keyframes} from 'styled-components'



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
`;

const StyledLoaderText = styled.div`
    font-size:1.35em;
`;


export const MonopolySpinner = () => {
    return (
        <StyledLoaderContainer>
            <img src={logo}/>
            <StyledLoaderText>Loading....</StyledLoaderText>
        </StyledLoaderContainer>
    )
}

