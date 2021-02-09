import React from 'react';
import PropTypes from 'prop-types';
import './MonopolyDealInputField.css'



export const MonopolyDealInputField = ({ mode,label,maxLength,placeholder,...props }) => {
    return (
        <div className="container-input" >
            <label for="monopoly-input" >{label}</label>
            <input type={mode} id="monopoly-input" maxlength={maxLength} placeholder={placeholder}></input> 
        </div>
    );
};



MonopolyDealInputField.propTypes = {
    mode: PropTypes.oneOf(["text","password"]),
    label: PropTypes.string,
    maxLength:PropTypes.number
};

MonopolyDealInputField.defaultProps ={
    mode:"Text",
    maxLength:10,
    placeholder:"text"
} 