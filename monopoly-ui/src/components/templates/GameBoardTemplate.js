import React,{useContext} from 'react'
import { GameBoardHeader } from '../organisms/GameBoardHeader'
import { GameLobbyMenu } from '../organisms/GameLobbyMenu'
import { GameStatusEnum } from '../../common/constants'
import { GameInProgressBoard} from '../organisms/GameInProgressBoard'
import { GameContext } from '../../context/GameContext'
import { PlayerContext } from '../../context/PlayerContext'


export const GameBoardTemplate = ()=> {
    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);

    return (
        <React.Fragment>
            {playerState.player && 
                <React.Fragment>
                    <GameBoardHeader/>
                    {gameState.game && gameState.game?.gameStatus == GameStatusEnum.WaitingToStart &&
                        <GameLobbyMenu/>
                    }
                    {gameState.game && gameState.game?.gameStatus == GameStatusEnum.InProgress &&
                        <GameInProgressBoard/>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

