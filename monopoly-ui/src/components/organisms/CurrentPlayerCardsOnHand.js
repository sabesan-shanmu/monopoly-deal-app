import React,{useContext} from 'react'
import { PlayerContext } from '../../context/PlayerContext';
import { MonopolyCard } from '../atoms/MonopolyCard';
import styled from 'styled-components';

import { CardTypeEnum,TransactionTrackerStatusEnum } from '../../common/constants';
import { CurrentPlayerCardsContext } from '../../context/CurrentPlayerCardsOnHandContext';
import { PreMoveCheckContext } from '../../context/PreMoveCheckContext';
import { GameMoveContext } from '../../context/GameMoveContext';
import {GameMoveStatusEnum } from '../../common/constants'



const FooterCardsContainer = styled.div`
    display:flex;
    overflow-x:auto;
    align-self: center;
    &>img{
        margin:10px;
    }
    min-height:180px;
`;


export const CurrentPlayerCardsOnHand = ()=> {

    const {currentPlayerCardsState,currentPlayerCardsStateDispatch} = useContext(CurrentPlayerCardsContext);
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext)
    
    const {preMoveCheckState,preMoveCheckStateDispatch} = useContext(PreMoveCheckContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const isCurrentPlayerMove = gameMoveState?.gameMove?.currentPlayer?.playerId == playerState.player.playerId && !gameMoveState.gameMove.transactionTracker 
        && gameMoveState?.gameMove?.gameMoveStatus == GameMoveStatusEnum.MoveInProgress
    console.log(currentPlayerCardsState);
    console.log(preMoveCheckState);

   
    const getListOfPossibleMoves = (playerCard)=>{
        return (preMoveCheckState.listOfPossibleMoves.find(t=>t.gameCardId == playerCard.gameCardId));
    }
    
    return (
        <FooterCardsContainer>
        {currentPlayerCardsState.playerCards && currentPlayerCardsState.playerCards.map((playerCard,key)=>{
            const listOfPossibleMoves= getListOfPossibleMoves(playerCard);
            const isCardSelectable = listOfPossibleMoves?.possibleMoves?.length>0 && isCurrentPlayerMove;
            return (
            <MonopolyCard gameCard={playerCard} cardType={CardTypeEnum.FaceUpCard} key={key} 
                isCardSelectable={isCardSelectable} 
                listOfPossibleMoves={listOfPossibleMoves} 
                popoverType={TransactionTrackerStatusEnum.InProgress}
                />
            )
        })}
        </FooterCardsContainer> 
    )
}


