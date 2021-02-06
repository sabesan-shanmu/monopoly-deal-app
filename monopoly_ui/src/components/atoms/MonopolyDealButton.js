import React from 'react';
import PropTypes from 'prop-types';
import './MonopolyDealButton.css'



export const MonopolyDealButton = ({size,label,...props }) => {

    return (
    <button
        type="button"
        className={['monopoly-button',`monopoly-button--${size}`].join(' ')}
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
};

MonopolyDealButton.defaultProps = {
  size: 'large',
  onClick: undefined,
};
