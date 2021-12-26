import React,{useContext,useState} from 'react'
import {StyledMenuContainer} from '../atoms/StyledMenuContainer'
import {GameContext} from '../../context/GameContext'
import {PlayerContext} from '../../context/PlayerContext'
import {GameWaitingRoom} from '../molecules/GameWaitingRoom'
import { PlayerVoteMenu} from '../molecules/PlayerVoteMenu'
import styled from 'styled-components'
import {playersApi} from '../../api/playersApi'
import {gamesApi} from '../../api/gamesApi'
import { ResourceTypes } from '../../common/constants'
import {getDecodedPlayer} from "../../adapters/playerAdapter"
import { MonopolySpinner } from '../atoms/MonopolySpinner'
import {StartGameScreen} from '../molecules/StartGameScreen'
import { FormError } from '../atoms/FormError'
import { GameStatusEnum } from '../../common/constants'

const GameLobbyMenuForm = styled.form`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    margin-top:120px;
`;


export const GameLobbyMenu = () =>{
    
    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const [isLoading,setIsLoading] = useState(false)
    const [formInput,setFormInput] = useState(
        {
            errors:null
        }
    )
    const gameLobbyMenuForm = {
        onSubmit:(e)=>{ 
            setIsLoading(true);
            gamesApi.post(gameState.game.links.self,playerState.player.accessToken,{gamePassCode:gameState.game.gamePassCode,gameStatus:GameStatusEnum.InProgress})
                .then(function(success){
                    console.log(success.data);
                    setIsLoading(false);
                })
                .catch(function(error){
                    console.log(error.response.data);
                    setFormInput({errors:error.response.data});
                    setIsLoading(false);
                })
            e.preventDefault();
        }
    };

    const playerVoteMenu = {
        playerVoteLabel:{
            text:"Ready to Play?",
            type:"h1"
        },
        playerVoteStatus:{
            flexDirection:"row",
            voteStatusId:playerState.player?.voteStatusId,
            onChange:(e)=>{
                setFormInput({errors:null});
                playersApi.vote(gameState.game.links.vote,playerState.player.accessToken,{voteStatusId:parseInt(e.target.value)})
                    .then(function(success){
                        console.log(success.data);
                        const playerData = getDecodedPlayer(success.data);
                        playerDispatch({type:ResourceTypes.UpdateResource,player:playerData});
                       
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                       
                    })
                e.preventDefault();
            }
        }
    };

    const startGameScreen = {
        mainStartGameFirstLabel:{
            text:"Click",
            type:"h2"
        },
        startGameBtn:{
            label:"Start Game",
            type:"submit"
        },
        mainStartGameSecondLabel:{
            text:"to begin",
            type:"h2"
        },
        waitingForPlayerOneLabel:{
            text:`${gameState?.game?.players?.find(t=>t.playerGameOrder == 1).playerName} must click Start Game`,
            type:"h2"
        },
        waitingforAllPlayersLabel:{
            text:"All Players must click Ready",
            type:"h2"
        },
        players:gameState.game.players,
        currentPlayer:playerState.player
    }


    return (
        <React.Fragment>
            {(!playerState.player || isLoading) &&
                <MonopolySpinner/>
            }
            {playerState.player && !isLoading &&
                <GameLobbyMenuForm  {...gameLobbyMenuForm}>
                    <StyledMenuContainer>
                        <PlayerVoteMenu  {...playerVoteMenu}/>
                        <StartGameScreen {...startGameScreen} />
                        {formInput.errors &&
                            <FormError errors={formInput.errors}/>
                        } 
                        <GameWaitingRoom players={gameState.game.players}  />    
                    </StyledMenuContainer>
                </GameLobbyMenuForm>
            }
        </React.Fragment>    
    )
}


