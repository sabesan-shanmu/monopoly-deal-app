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
        color:white;
        font-size:1.35em;
        line-height: 1.35em;
    }
    &>input
    {
        font-size:1.35em;
        line-height: 1.35em;
        padding:2px;
        width:100%;
        box-sizing:border-box;
    }
    @media ${device.xlarge} {
        &>label
        {
            width:160px;
        }


    }

    @media ${device.large} { 
        &>label
        {

            width:130px;
        }

    }
    @media ${device.medium} { 
        &>label
        {

            width:120px;
        }

    }
    @media ${device.small} { 
        &>label
        {
            width:100px;
        }

    }

`;



export const MonopolyDealInputField = ({ mode,label,maxLength,minLength,isRequired,placeholder,...props }) => {

    
    return (
        <StyledInput>
            <label>{label}</label>
            <input type={mode} maxLength={maxLength} minLength={minLength} placeholder={placeholder} required={isRequired} {...props}>
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