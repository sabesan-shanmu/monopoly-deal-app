import React from 'react';
import PropTypes from 'prop-types';
import './MonopolyDealInputField.css'



export const MonopolyDealInputField = ({ mode,size,label, ...props }) => {
    return (
        <div class="container-input">
            <label>{label}</label>
            <input type={mode} ></input> 
        </div>
    );
};



MonopolyDealInputField.propTypes = {
    mode: PropTypes.oneOf(["text","password"]),
    label: PropTypes.string
};

MonopolyDealInputField.defaultProps ={
    mode:"Text",
    label:"Text:"
} 