import React,{useContext} from 'react'
import styled from 'styled-components'
import { GameContext } from '../../context/GameContext'
import { PlayerBlock } from '../molecules/PlayerBlock'
import {getBlockProperty,getActiveGameBlocks} from '../../common/GameHelpers'
import {GameBlockEnum} from '../../common/constants'


const StyledGameBoardArea = styled.div`
    display:grid;
    grid-template-columns:repeat(4,1fr);
    grid-template-rows:${(props)=>`repeat(${props.numberOfRows},1fr)`};
`;



export const GameBoardArea = () => {

    const {gameState,gameDispatch} = useContext(GameContext);
    const players = gameState.game.players;


    const activeBlocks = getActiveGameBlocks(gameState.game.numberOfPlayers);
    




    return (
        <StyledGameBoardArea numberOfRows={activeBlocks.numberOfRows}> 
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.TopFarLeft,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.TopLeft,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.TopRight,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.TopFarRight,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.MiddleFarLeft,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.MiddleLeft,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.MiddleRight,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.MiddleFarRight,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.BottomFarLeft,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.BottomLeft,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.BottomRight,players,activeBlocks)} />
            <PlayerBlock game={gameState.game} {...getBlockProperty(GameBlockEnum.BottomFarRight,players,activeBlocks)} />
        </StyledGameBoardArea>
    )
}
