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
    &>select
    {
        font-size:1.35em;
        line-height:1.35em;
        padding:2px;  
        width:100%; 
        box-sizing: content-box;
        text-overflow: ellipsis;
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