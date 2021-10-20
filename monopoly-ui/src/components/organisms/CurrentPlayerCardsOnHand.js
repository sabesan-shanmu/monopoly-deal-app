import React,{useContext,useEffect,useState} from 'react'
import { GameContext } from '../../context/GameContext'
import { PlayerContext } from '../../context/PlayerContext';
import { playerCardsApi } from '../../api/playerCardsApi';
import { InProgressBoardFooter } from '../atoms/InProgressBoardFooter';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import styled from 'styled-components';

const FooterTitleContainer = styled.div`
    display:flex;
    color:white;
    align-self: center;
`;


const FooterCardsContainer = styled.div`
    display:flex;
    overflow-x:auto;
    align-self: center;
    &>img{
        margin:10px;
    }
    width:inherit;
`;


export const CurrentPlayerCardsOnHand = ()=> {

    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const [playerCards,setPlayerCards] = useState([])
    
    const footerTitleLabel = {
        text:"My Cards On Hand",
        type:"h2"
    };

    useEffect(()=>{
        playerCardsApi.get(gameState.game.links.playerCards,playerState.player.accessToken)
        .then(function(success){
            console.log(success.data);
            setPlayerCards(success.data);
        })
        .catch(function(error){
            console.log(error.response.data);
            setPlayerCards([]);
        })
    },[])
    
    return (
        <InProgressBoardFooter>
            <FooterTitleContainer>
                <MonopolyDealLabel {...footerTitleLabel} />    
            </FooterTitleContainer>
            <FooterCardsContainer>
            {playerCards && playerCards.map((playerCard,key)=>
                <MonopolyCard gameCard={playerCard} key={key} />
             )}
            </FooterCardsContainer> 
           
        </InProgressBoardFooter>
    )
}


