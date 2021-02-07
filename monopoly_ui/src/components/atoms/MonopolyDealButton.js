import React from 'react';
import PropTypes from 'prop-types';
import './MonopolyDealButton.css'



export const MonopolyDealButton = ({label,disabled,...props }) => {

    return (
    <button
        type="button"
        className="monopoly-button"
        disabled={disabled}
        {...props}
    >
        {label}
    </button>
    );
};  

MonopolyDealButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled:PropTypes.bool,
};

MonopolyDealButton.defaultProps = {
  disabled:false
};
