import React from 'react'
import PropTypes from 'prop-types';
import {MainLogoImage} from '../atoms/MainLogoImage'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import './GameTitleMenu.css'

export const GameTitleMenu = ()=> {
    
    const left = {
        onClick:null,
        label:"New Game"
    }
    const right ={
        onClick:null,
        label:"Join Game"
    }

    return (
        <main className="game-title-menu-container">
            <div className="game-title-menu-container__header">
                <MainLogoImage  />
            </div>
            <div className="game-title-menu-container__body">
                <MonopolyDealButton {...left} />
                <MonopolyDealButton {...right} /> 
            </div>
        </main>
    )
}

