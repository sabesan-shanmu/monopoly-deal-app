import React,{useContext} from 'react'
import { PlayerContext } from '../../context/PlayerContext';
import { MonopolyCard } from '../atoms/MonopolyCard';
import styled from 'styled-components';

import { CardTypeEnum,TransactionTrackerStatusEnum } from '../../common/constants';
import { CurrentPlayerCardsContext } from '../../context/CurrentPlayerCardsOnHandContext';
import { PreMoveCheckContext } from '../../context/PreMoveCheckContext';
import { GameMoveContext } from '../../context/GameMoveContext';
import {GameMoveStatusEnum } from '../../common/constants'
import {MAX_NUMBER_OF_CARDS} from '../../common/constants'


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

   
    const getListOfPossibleMoves = (playerCard)=>{
        return (preMoveCheckState.listOfPossibleMoves.find(t=>t.gameCardId == playerCard.gameCardId));
    }
    
    return (
        <FooterCardsContainer>
        {currentPlayerCardsState.playerCards && currentPlayerCardsState.playerCards.map((playerCard,key)=>{
            const listOfPossibleMoves= getListOfPossibleMoves(playerCard);
            const isCardSelectable = gameMoveState?.gameMove?.currentPlayer?.playerId == playerState.player.playerId && 
            (listOfPossibleMoves?.possibleMoves?.length>0 && !gameMoveState.gameMove.transactionTracker && gameMoveState?.gameMove?.gameMoveStatus == GameMoveStatusEnum.MoveInProgress || 
            currentPlayerCardsState.playerCards.length > MAX_NUMBER_OF_CARDS && gameMoveState?.gameMove?.gameMoveStatus == GameMoveStatusEnum.DiscardExtraCards) 
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


