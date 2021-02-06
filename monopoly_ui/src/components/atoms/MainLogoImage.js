import React from 'react'
import logo from '../../assets/img/main-logo.png'
import PropTypes from 'prop-types';
import './MainLogoImage.css'


export const MainLogoImage = ({size}) => {
    return (
        <img className={`monopoly-image--${size}`} src={logo}/>
    )
}


MainLogoImage.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };
  
MainLogoImage.defaultProps = {
    size: 'large',

};
  