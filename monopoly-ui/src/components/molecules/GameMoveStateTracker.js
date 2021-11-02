import React from 'react'
import { GameMoveStatusEnum } from '../../common/constants'
import { MonopolyDealButton } from '../atoms/MonopolyDealButton'
import styled from 'styled-components';
import { gameMoveApi } from '../../api/gameMoveApi';

const StyledStartChoiceHeader = styled.div`
    margin-top:5px;
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    align-items: center;
    width:100%;
    &>button{
        flex:2;
        max-width:200px;
        margin:2px;
    }
`;


export const GameMoveStateTracker = ({gameMove,game,player})=>{
    console.log({gameMove,game,player});
    const startTurnBtn = {
        label:"Start Turn"
    }
    
    
    const drawCardsBtn = {
        label:"Start Turn",
        onClick:(e)=>{
            let payload = {
                gameMoveStatus:GameMoveStatusEnum.DrawTwoCardsInProgress,
                currentPlayerId:gameMove.currentPlayer.playerId
            };

            gameMoveApi.patch(game.links.gameMoves,player.accessToken,payload)
            .then(function(success){
                console.log(success.data);
            })
            .catch(function(error){
                console.log(error.response.data);
            })
        }
    }
    
    const skipTurnBtn = {
        label:"Skip Turn",
        onClick:(e)=>{
            let payload = {
                gameMoveStatus:GameMoveStatusEnum.SkipYourTurn,
                currentPlayerId:gameMove.currentPlayer.playerId
            };

            gameMoveApi.patch(game.links.gameMoves,player.accessToken,payload)
            .then(function(success){
                console.log(success.data);
            })
            .catch(function(error){
                console.log(error.response.data);
            })
        }
    }
    
    return (
        <div>
            {gameMove.numberOfMovesPlayed == 0 && gameMove.gameMoveStatus == GameMoveStatusEnum.WaitingForPlayerToBeginMove &&
                <StyledStartChoiceHeader>
                    <MonopolyDealButton {...drawCardsBtn}/>
                     -OR-
                    <MonopolyDealButton {...skipTurnBtn} />
                </StyledStartChoiceHeader>
            }
            {gameMove.numberOfMovesPlayed != 0 && gameMove.gameMoveStatus == GameMoveStatusEnum.WaitingForPlayerToBeginMove &&
                <StyledStartChoiceHeader>
                    <MonopolyDealButton {...startTurnBtn}/>
                     -OR-
                    <MonopolyDealButton {...skipTurnBtn} />
                </StyledStartChoiceHeader>
            }
            
        </div>
    )
}