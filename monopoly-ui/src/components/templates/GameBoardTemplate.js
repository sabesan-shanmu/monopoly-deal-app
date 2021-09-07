import React,{useContext} from 'react'
import { GameBoardHeader } from '../organisms/GameBoardHeader'
import { GameLobbyMenu } from '../organisms/GameLobbyMenu'
import { GameStatusEnum } from '../../common/constants'
import { GameInProgressBoard} from '../organisms/GameInProgressBoard'
import { GameContext } from '../../context/GameContext'


export const GameBoardTemplate = ()=> {
    const {gameState,gameDispatch} = useContext(GameContext);

    return (
        <React.Fragment>
            <GameBoardHeader/>
            {gameState.game && gameState.game?.gameStatus == GameStatusEnum.WaitingToStart &&
                <GameLobbyMenu/>
            }
            {gameState.game && gameState.game?.gameStatus == GameStatusEnum.InProgress &&
                <GameInProgressBoard/>
            }
        </React.Fragment>
    )
}

