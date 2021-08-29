import React,{useContext} from 'react'
import {StyledMenuContainer} from '../atoms/StyledMenuContainer'
import {GameContext} from '../../context/GameContext'
import {GameWaitingRoom} from '../molecules/GameWaitingRoom'


export const GameLobbyMenu = () =>{
    
    const {gameState,gameDispatch} = useContext(GameContext);
    return (
        <StyledMenuContainer>
            <GameWaitingRoom players={gameState.game.players}  />   
        </StyledMenuContainer>
    )
}


