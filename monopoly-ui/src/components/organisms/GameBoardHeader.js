import React,{useContext} from 'react'
import {PlayerCharacter} from '../molecules/PlayerCharacter'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {PlayerContext} from '../../context/PlayerContext'
import {sessionsApi} from "../../api/sessionsApi"
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {ActionTypes} from '../../common/constants'
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel'
import { GameContext } from '../../context/GameContext'
import { MessageHeader } from '../atoms/MessageHeader'
import { GameMoveStateTracker } from '../molecules/GameMoveStateTracker'
import { GameMoveContext } from '../../context/GameMoveContext'

const StyledGameHeader = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start; 
    width:100%; 
    border: 5px solid black;
    &>button{
        justify-self: end;
    }
    &>div{
        text-align: center;
    }
    grid-area: header;
    color:white;
`

export const GameBoardHeader = () =>{

    const {playerState,playerDispatch} = useContext(PlayerContext);
    const {gameState,gameDispatch} = useContext(GameContext);
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext);
  
    const history = useHistory();
    const game = gameState.game;

    const gameTitleLabel = {
        text:`Game Name: ${game.name}`,
        type:"h2"
    };

    const logoutBtn = {
        onClick:()=>{
            sessionsApi.clear()
                .then(function(success){
                    console.log(success.data);
                    playerDispatch({type:ActionTypes.DeleteResource});
                    history.push('/games-list');
                })
                .catch(function(error){
                    console.log(error.response.data);
                })
        },
        label:"Logout"
    }

    return (
        <React.Fragment>
        {playerState.player &&
            <StyledGameHeader>
                <PlayerCharacter
                    {...playerState.player} 
                />
                <div>
                    <MonopolyDealLabel
                            {...gameTitleLabel}

                    />
                    {gameMoveState.gameMove &&
                        <React.Fragment>
                            <MessageHeader
                                {...gameMoveState.gameMove}
                            />
                            {gameMoveState.gameMove.currentPlayer.playerId == playerState.player.playerId  &&
                                <GameMoveStateTracker
                                    gameMove={gameMoveState.gameMove}
                                    game={game}
                                    player={playerState.player}
                                />
                            }
                        </React.Fragment>
                    }
                </div>
             
                <MonopolyDealButton
                    {...logoutBtn}
                />
            </StyledGameHeader>
        }
        </React.Fragment>
    )
}


