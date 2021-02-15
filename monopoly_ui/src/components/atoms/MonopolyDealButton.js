import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {device} from "../../common/devices";

const StyledMonopolyDealButton = styled.button`
    border: none;
    background-color:#C70000;
    color:white;
    border:1px solid white;
    border-radius:6px;
    cursor: pointer;
    padding:5px;

    &:disabled{
      cursor:not-allowed;
      opacity:0.6
    }
    @media ${device.desktop} {
      font-size:20px;
      min-width:150px;
    }
    
    @media ${device.tablet} { 
      font-size:15px;
      min-width:80px;
    }

    @media ${device.mobile} { 
      font-size:12px;
      min-width:60px;
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
