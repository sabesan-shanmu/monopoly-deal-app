import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'


const StyledLabel = styled.label`
    &[type="h1"]{
        font-size:30px;
    }  
    
    &[type="h2"]{
        font-size:20px;
    }    
    &[type="h4"]{
        font-size:15px;
    }    
`  


export const MonopolyDealLabel = ({text,type}) => {
    return (
        <StyledLabel type={type}>
            {text} 
        </StyledLabel>
    )
}

MonopolyDealLabel.propTypes = {
    label: PropTypes.string,
    size:PropTypes.oneOf('h1','h2','h3','h4')
};