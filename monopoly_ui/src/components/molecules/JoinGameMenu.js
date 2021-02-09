import React from 'react'

export const JoinGameMenu = () => {

    const games = [];
    
    const left = {
        onClick:null,
        label:"Cancel"
    }
    const right = {
        onClick:null,
        label:"Join",
        disabled :true
    }
    

    return (
        <main className="join-game-menu-container">
            <div className="join-game-menu-container__header">
                <GameEntries games={game} onClick={null} /> 
            </div>
            <div className="join-game-menu-container__body">
                <MonopolyDealButton {...left} />
                <MonopolyDealButton {...right} /> 
            </div>
        </main>
    )
}

