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


const StyledGameHeader = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start; 
    width:100%; 
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

    const history = useHistory();
    const player = {...playerState.player};
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
        {player &&
            <StyledGameHeader>
                <PlayerCharacter
                    {...player} 
                />
                <div>
                    <MonopolyDealLabel
                            {...gameTitleLabel}

                    />
                    <MessageHeader/>
                </div>
             
                <MonopolyDealButton
                    {...logoutBtn}
                />
            </StyledGameHeader>
        }
        </React.Fragment>
    )
}


