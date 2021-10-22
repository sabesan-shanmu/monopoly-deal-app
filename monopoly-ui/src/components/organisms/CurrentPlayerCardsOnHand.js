import React,{useContext,useEffect,useState} from 'react'
import { GameContext } from '../../context/GameContext'
import { PlayerContext } from '../../context/PlayerContext';
import { playerCardsApi } from '../../api/playerCardsApi';
import { InProgressBoardFooter } from '../atoms/InProgressBoardFooter';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import styled from 'styled-components';
import maximizeIcon from '../../assets/img/maximize.png'
import minimizeIcon from '../../assets/img/minimize.png'

const FooterTitleContainer = styled.div`
    display:flex;
    color:white;
    align-self: center;
    &>label{
        padding-right:10px;
    }

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
    const [isFooterVisible,setIsFooterVisible] = useState(true);
    
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

    const getIcon = ()=> {
        return isFooterVisible?
        (
            <img src={minimizeIcon}/>
        ):
        (
            <img src={maximizeIcon}/>
        );
    }

    
    return (
        <InProgressBoardFooter isFooterVisible={isFooterVisible}>
            <FooterTitleContainer onClick={()=>setIsFooterVisible(!isFooterVisible)} >
                <MonopolyDealLabel {...footerTitleLabel} />    
                {getIcon()}
            </FooterTitleContainer>
            {isFooterVisible &&
                <FooterCardsContainer>
                {playerCards && playerCards.map((playerCard,key)=>
                    <MonopolyCard gameCard={playerCard} key={key} />
                )}
                </FooterCardsContainer> 
            }
        </InProgressBoardFooter>
    )
}


