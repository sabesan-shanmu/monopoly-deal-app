import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'


const StyledCharacterImage = styled.img`
    width:100px;
    height:100px;
`;

export const CharacterImage = ({imageId}) => {
    console.log(imageId);
    return (
        <StyledCharacterImage src={`../../assets/img/avatar/avatar-${imageId}.png`}/>
    )
}



  