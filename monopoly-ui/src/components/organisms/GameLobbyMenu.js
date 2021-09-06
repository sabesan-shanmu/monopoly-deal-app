import React,{useContext} from 'react'
import {StyledMenuContainer} from '../atoms/StyledMenuContainer'
import {GameContext} from '../../context/GameContext'
import {PlayerContext} from '../../context/PlayerContext'
import {GameWaitingRoom} from '../molecules/GameWaitingRoom'
import { PlayerVoteMenu} from '../molecules/PlayerVoteMenu'
import styled from 'styled-components'
import {playersApi} from '../../api/playersApi'
import { ActionTypes } from '../../common/constants'
import {getDecodedPlayer} from "../../adapters/playerAdapter"


const GameLobbyMenuContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
`;


export const GameLobbyMenu = () =>{
    
    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    
    const playerVoteMenu = {
        playerVoteLabel:{
            text:"Ready to Play?",
            type:"h1"
        },
        playerVoteStatus:{
            flexDirection:"row",
            voteStatusId:playerState.player.voteStatusId,
            onChange:(e)=>{
                console.log(e.target.value);
                playersApi.vote(gameState.game.links.vote,playerState.player.accessToken,{voteStatusId:parseInt(e.target.value)})
                    .then(function(success){
                        console.log(success.data);
                        const playerData = getDecodedPlayer(success.data);
                        playerDispatch({type:ActionTypes.UpdateResource,player:playerData});
                       
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                       
                    })
                e.preventDefault();
            }
        }
    };


    return (
        <GameLobbyMenuContainer>
            <StyledMenuContainer>
                <PlayerVoteMenu  {...playerVoteMenu}/>
                <GameWaitingRoom players={gameState.game.players}  />    
            </StyledMenuContainer>
        </GameLobbyMenuContainer>
    )
}


