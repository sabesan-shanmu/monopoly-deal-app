import React from 'react'
import PropTypes from 'prop-types';
import {MainLogoImage} from '../atoms/MainLogoImage'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import './GameTitleMenu.css'

export const GameTitleMenu = ({size})=> {
    
    const primary = {
        onclick:null,
        label:"New Game"
    }
    const secondary ={
        onclick:null,
        label:"Join Game"
    }

    return (
        <main className="game-title-menu-container">
            <div class="game-title-menu-container__header">
                <MainLogoImage size={size} />
            </div>
            <div class="game-title-menu-container__body">
                <MonopolyDealButton size={size} {...primary} />
                <MonopolyDealButton size={size} {...secondary} /> 
            </div>
        </main>
    )
}

GameTitleMenu.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };
  
GameTitleMenu.defaultProps = {
    size: 'large',
};
  