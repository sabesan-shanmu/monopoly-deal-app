import React from 'react';
import PropTypes from 'prop-types';
import './MonopolyDealButton.css'


export const MonopolyDealButton = ({ mode,size,label, ...props }) => {

    return (
    <button
        type="button"
        className={['monopoly-button', `monopoly-button--${mode}`, `monopoly-button--${size}`].join(' ')}
        {...props}
    >
        {label}
    </button>
    );
};

MonopolyDealButton.propTypes = {
  /**
   * Button Mode
   */
  mode: PropTypes.oneOf(['primary']),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

MonopolyDealButton.defaultProps = {
  mode: 'primary',
  size: 'medium',
  onClick: undefined,
};
