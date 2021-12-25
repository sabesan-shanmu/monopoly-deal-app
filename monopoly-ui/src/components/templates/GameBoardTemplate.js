import React,{useContext} from 'react'
import { GameBoardHeader } from '../organisms/GameBoardHeader'
import { GameLobbyMenu } from '../organisms/GameLobbyMenu'
import { GameStatusEnum } from '../../common/constants'
import { GameInProgressBoard} from '../organisms/GameInProgressBoard'
import { GameContext } from '../../context/GameContext'
import { PlayerContext } from '../../context/PlayerContext'
import { GameMoveContextProvider } from '../../context/GameMoveContext'
import { PreMoveCheckContextProvider } from '../../context/PreMoveCheckContext';
import { InPlayMoveCheckContextProvider } from '../../context/InPlayMoveCheckContext';
import { SelectionMoveCheckContextProvider } from '../../context/SelectionMoveCheckContext';


export const GameBoardTemplate = ()=> {
    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);

    return (
        <React.Fragment>
            {playerState.player && 
                <React.Fragment>
                    <GameMoveContextProvider>
                        <PreMoveCheckContextProvider> 
                            <InPlayMoveCheckContextProvider>
                                <SelectionMoveCheckContextProvider>
                                    <GameBoardHeader/>
                                    {gameState.game && gameState.game?.gameStatus == GameStatusEnum.WaitingToStart &&
                                        <GameLobbyMenu/>
                                    }
                                    {gameState.game && gameState.game?.gameStatus == GameStatusEnum.InProgress &&
                                        <GameInProgressBoard game={gameState.game}/>
                                    }
                                </SelectionMoveCheckContextProvider>
                            </InPlayMoveCheckContextProvider>
                        </PreMoveCheckContextProvider>
                    </GameMoveContextProvider>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

