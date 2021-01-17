import React from 'react'
import MainLogoImg from '../atoms/MainLogoImg'
import MonopolyDealButton from '../atoms/MonopolyDealButton'

function GameTitle() {
    return (
        <div className="GameTitle-content">
            <MainLogoImg/>
            <React.Fragment/>
            <MonopolyDealButton/>
        </div>
    )
}

export default GameTitle
