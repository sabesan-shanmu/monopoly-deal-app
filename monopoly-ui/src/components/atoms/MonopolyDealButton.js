import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {device} from "../../common/devices";

const StyledMonopolyDealButton = styled.button`
    border: none;
    background-color:#C70000;
    //max-height:35px;
    color:white;
    border:1px solid white;
    border-radius:6px;
    cursor: pointer;
    padding:5px;
    font-size:1.35em;
    &:disabled{
      cursor:not-allowed;
      opacity:0.6
    }

`;



export const MonopolyDealButton = ({label,disabled,...props }) => {
  
    return (
    <StyledMonopolyDealButton
        type="button"
        disabled={disabled}
        {...props}
    >
        {label}
    </StyledMonopolyDealButton>
    );
};  

MonopolyDealButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled:PropTypes.bool
};

MonopolyDealButton.defaultProps = {
  disabled:false
};
