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

    @media ${device.xlarge} {
        &>input
        {
            font-size:20px;
            padding:2px;
            width:160px;
        }
        &>input::placeholder,
        &>input::-webkit-input-placeholder ,
        &>input::-moz-placeholder,
        &>input:-ms-input-placeholder,
        &>input:-moz-placeholder
        {
            line-height:20px;
        }
        &>label
        {
            font-size:20px;
            padding:2px;
            width:80px;
        }
    }

    @media ${device.large} { 
        &>input
        {
            font-size:18px;
            padding:2px;
            width:120px;
        }
        &>input::placeholder,
        &>input::-webkit-input-placeholder ,
        &>input::-moz-placeholder,
        &>input:-ms-input-placeholder,
        &>input:-moz-placeholder
        {
            line-height:18px;
        }
        &>label
        {
            font-size:18px;
            padding:2px;
            width:60px;
        }
    }
    @media ${device.medium} { 
        &>input
        {
            font-size:18px;
            padding:2px;
            width:125px;
        }
        &>input::placeholder,
        &>input::-webkit-input-placeholder ,
        &>input::-moz-placeholder,
        &>input:-ms-input-placeholder,
        &>input:-moz-placeholder
        {
            line-height:18px;
        }
        &>label
        {
            
            font-size:18px;
            padding:2px;
            width:60px;
        }
    }
    @media ${device.small} { 
        &>input
        {
            font-size:8px;
            padding:2px;
            width:100px;
        }
        &>input::placeholder,
        &>input::-webkit-input-placeholder ,
        &>input::-moz-placeholder,
        &>input:-ms-input-placeholder,
        &>input:-moz-placeholder
        {
            line-height:8px;
        }
        &>label
        {
            font-size:8px;
            padding:2px;
            width:50px;
        }
    }

`;



export const MonopolyDealInputField = ({ mode,label,maxLength,minLength,isRequired,placeholder,...props }) => {

    
    return (
        <StyledInput className="container-input" >
            <label htmlFor="monopoly-input" >{label}</label>
            <input type={mode} id="monopoly-input" maxLength={maxLength} minLength={minLength} placeholder={placeholder} required={isRequired} {...props}>
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