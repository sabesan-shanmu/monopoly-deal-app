import React from 'react'
import logo from '../../assets/img/main-logo.png'
import PropTypes from 'prop-types';
import styled from 'styled-components'


const StyledMainLogoImage = styled.img`
    width:100%;
`;

export const MainLogoImage = () => {
    return (
        <StyledMainLogoImage src={logo}/>
    )
}



  