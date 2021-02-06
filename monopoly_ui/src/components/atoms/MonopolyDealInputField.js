import React from 'react';
import PropTypes from 'prop-types';
import './MonopolyDealInputField.css'



export const MonopolyDealInputField = ({ mode,size,label,maxLength,placeholder,...props }) => {
    return (
        <div className={['container-input',`container-input--${size}`].join(' ')} >
            <label for="monopoly-input" >{label}</label>
            <input type={mode} id="monopoly-input"maxlength={maxLength} placeholder={placeholder}></input> 
        </div>
    );
};



MonopolyDealInputField.propTypes = {
    size: PropTypes.oneOf(["small","medium","large"]),
    mode: PropTypes.oneOf(["text","password"]),
    label: PropTypes.string,
    maxLength:PropTypes.number
};

MonopolyDealInputField.defaultProps ={
    size:"medium",
    mode:"Text",
    maxLength:10,
    placeholder:"text"
} 