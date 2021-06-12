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
        &>select
        {
            font-size:20px;
            padding:2px;
            width:168px;
        }
        &>label
        {
            font-size:20px;
            padding:2px;
            width:80px;
        }
    }

    @media ${device.large} { 
        &>select
        {
            font-size:18px;
            padding:2px;
            width:128px;
        }
        &>label
        {
            font-size:18px;
            padding:2px;
            width:60px;
        }
    }
    @media ${device.medium} { 
        &>select
        {
            font-size:18px;
            padding:2px;
            width:133px;
        }
        &>label
        {
            
            font-size:18px;
            padding:2px;
            width:60px;
        }
    }
    @media ${device.small} { 
        &>select
        {
            font-size:12px;
            padding:2px;
            width:108px;
        }
        &>label
        {
            font-size:12px;
            padding:2px;
            width:50px;
        }
    }

`;



export const MonopolyDealDropdown = ({label,placeholder,value,options,...props }) => {

    
    return (
        <StyledInput className="container-ddl" >
            <label htmlFor="monopoly-ddl" >{label}</label>
            <select id="monopoly-ddl" value={value} {...props}>
                <option value="">{placeholder}</option>
                {options && options.map((option,key)=>
                     <option key={option.value} value={option.value} >{option.text}</option>
                )}
            </select> 
        </StyledInput>
    );
};



MonopolyDealDropdown.propTypes = {
    label: PropTypes.string,
    placeholder:PropTypes.string
};

MonopolyDealDropdown.defaultProps ={
    label:"text",
    placeholder:"text"
} 