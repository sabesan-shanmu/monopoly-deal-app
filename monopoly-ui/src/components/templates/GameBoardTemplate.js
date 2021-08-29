import React from 'react'
import { GameBoardHeader } from '../organisms/GameBoardHeader'
import { GameLobbyMenu } from '../organisms/GameLobbyMenu'

export const GameBoardTemplate = ()=> {

    return (
        <React.Fragment>
            <GameBoardHeader/>
            <GameLobbyMenu/>
        </React.Fragment>
    )
}

