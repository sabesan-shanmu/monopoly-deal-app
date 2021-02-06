import React from 'react';
import PropTypes from 'prop-types';
import './MonopolyDealButton.css'



export const MonopolyDealButton = ({size,label,disabled,...props }) => {

    return (
    <button
        type="button"
        className={['monopoly-button',`monopoly-button--${size}`].join(' ')}
        disabled={disabled}
        {...props}
    >
        {label}
    </button>
    );
};  

MonopolyDealButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled:PropTypes.bool,
};

MonopolyDealButton.defaultProps = {
  size: 'large',
  disabled:false
};
