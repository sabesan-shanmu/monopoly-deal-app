import React,{useContext} from 'react'
import {PlayerCharacter} from '../molecules/PlayerCharacter'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {PlayerContext} from '../../context/PlayerContext'
import {GameContext} from '../../context/GameContext'
import {sessionsApi} from "../../api/sessionsApi"
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {ActionTypes} from '../../common/constants'


const StyledGameHeader = styled.div`
    display:grid;
    grid-template-columns: 2fr 2fr;
    align-items: center;
    top:0;
    position:fixed;   
    width:100%; 
    
    &>button{
        justify-self: end;
    }
`

export const GameBoardHeader = () =>{

    const {playerState,playerDispatch} = useContext(PlayerContext);
    //const {gameState,gameDispatch} = useContext(GameContext);
    const history = useHistory();
    const player = playerState.player;


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
                <MonopolyDealButton
                    {...logoutBtn}
                />
            </StyledGameHeader>
        }
        </React.Fragment>
    )
}

