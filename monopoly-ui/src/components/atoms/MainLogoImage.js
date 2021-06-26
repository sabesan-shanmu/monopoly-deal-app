import React from 'react'
import logo from '../../assets/img/logo/main-logo.png'
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



  