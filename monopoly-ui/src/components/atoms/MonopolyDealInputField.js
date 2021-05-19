import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {device} from "../../common/devices";


const StyledInput = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    
    &>label{
        background-color: #C70000;
        border:1px solid black;
        color:white
    }

    @media ${device.desktop} {
        &>input,
        &>label
        {
            font-size:20px;
            padding:2px;
        }
    }

    @media ${device.tablet} { 
        &>input,
        &>label
        {
            font-size:18px;
            padding:2px;
        }
    }
  
    @media ${device.mobile} { 
        &>input,
        &>label
        {
            font-size:12px;
            padding:2px;
        }
    }

`;



export const MonopolyDealInputField = ({ mode,label,maxLength,minLength,isRequired,placeholder,...props }) => {

    
    return (
        <StyledInput className="container-input" >
            <label htmlFor="monopoly-input" >{label}</label>
            <input type={mode} id="monopoly-input" maxLength={maxLength} minLength={minLength} placeholder={placeholder} required={isRequired}>
            </input> 
        </StyledInput>
    );
};



MonopolyDealInputField.propTypes = {
    mode: PropTypes.oneOf(["text","password"]),
    label: PropTypes.string,
    maxLength:PropTypes.number,
    minLength:PropTypes.number,
    isRequired:PropTypes.bool
};

MonopolyDealInputField.defaultProps ={
    mode:"Text",
    maxLength:10,
    minLength:2,
    placeholder:"text",
    isRequired:true
} 