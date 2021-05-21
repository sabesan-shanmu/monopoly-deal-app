import React from 'react'
import logo from '../../assets/img/spinner.png'
import styled,{keyframes} from 'styled-components'



const StyledLoaderText = styled.h1`
    
`;




export const MonopolySpinner = () => {
    return (
        <React.Fragment>
            <img src={logo}/>
            <StyledLoaderText>Loading....</StyledLoaderText>
        </React.Fragment>
    )
}

