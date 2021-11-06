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
import { CardTypeEnum } from '../../common/constants';
import { CurrentPlayerCardsContext } from '../../context/CurrentPlayerCardsOnHandContext';
import { PreMoveCheckContext } from '../../context/PreMoveCheckContext';

const FooterTitleContainer = styled.div`
    display:flex;
    color:white;
    justify-self: center;
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
`;


export const CurrentPlayerCardsOnHand = ()=> {

    const {currentPlayerCardsState,currentPlayerCardsStateDispatch} = useContext(CurrentPlayerCardsContext);
 
    const [isFooterVisible,setIsFooterVisible] = useState(true);
    const {preMoveCheckState,preMoveCheckStateDispatch} = useContext(PreMoveCheckContext);
    
    console.log(currentPlayerCardsState);
    console.log(preMoveCheckState);

    const footerTitleLabel = {
        text:"My Cards On Hand",
        type:"h2"
    };
    

    const getIcon = ()=> {
        return isFooterVisible?
        (
            <img src={minimizeIcon}/>
        ):
        (
            <img src={maximizeIcon}/>
        );
    }
    
    const isCardPlayable = (playerCard)=>{
        
        return (preMoveCheckState.listOfPossibleMoves.find(t=>t.gameCardId == playerCard.gameCardId))?true:false;
    }

    
    return (
        <InProgressBoardFooter isFooterVisible={isFooterVisible}>
            <FooterTitleContainer onClick={()=>setIsFooterVisible(!isFooterVisible)} >
                <MonopolyDealLabel {...footerTitleLabel} />    
                {getIcon()}
            </FooterTitleContainer>
            {isFooterVisible &&
                <FooterCardsContainer>
                {currentPlayerCardsState.playerCards && currentPlayerCardsState.playerCards.map((playerCard,key)=>
                    <MonopolyCard gameCard={playerCard} cardType={CardTypeEnum.FaceUpCard} key={key} isCardSelectable={isCardPlayable(playerCard)} />
                )}
                </FooterCardsContainer> 
            }
        </InProgressBoardFooter>
    )
}


