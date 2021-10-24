import React,{useContext} from 'react'
import styled from 'styled-components'
import { GameContext } from '../../context/GameContext'
import { PlayerBlock } from '../molecules/PlayerBlock'
import {getBlockProperty,getActiveGameBlocks} from '../../common/GameHelpers'
import {GameBlockEnum} from '../../common/constants'


const StyledGameBoardArea = styled.div`
    display:grid;
    grid-template-columns:repeat(4,1fr);
    grid-template-rows:repeat(3,1fr);
`;



export const GameBoardArea = () => {

    const {gameState,gameDispatch} = useContext(GameContext);
    const players = gameState.game.players;
    console.log(gameState.game)


    const activeBlocks = getActiveGameBlocks(gameState.game.numberOfPlayers);
    



    console.log(activeBlocks);

    return (
        <StyledGameBoardArea>
            <PlayerBlock {...getBlockProperty(GameBlockEnum.TopFarLeft,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.TopLeft,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.TopRight,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.TopFarRight,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.MiddleFarLeft,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.MiddleLeft,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.MiddleRight,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.MiddleFarRight,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.BottomFarLeft,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.BottomLeft,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.BottomRight,players,activeBlocks)} />
            <PlayerBlock {...getBlockProperty(GameBlockEnum.BottomFarRight,players,activeBlocks)} />
        </StyledGameBoardArea>
    )
}
