import React,{useState} from 'react'
import { CurrentPlayerCardsOnHand } from './CurrentPlayerCardsOnHand'
import { InProgressBoardContainer } from '../atoms/InProgressBoardContainer'
import { GameBoardArea } from './GameBoardArea'
import {CurrentPlayerCardsContextProvider} from '../../context/CurrentPlayerCardsOnHandContext'
import maximizeIcon from '../../assets/img/maximize.png'
import minimizeIcon from '../../assets/img/minimize.png'
import { InProgressBoardFooter } from '../atoms/InProgressBoardFooter';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import styled from 'styled-components';


const FooterTitleContainer = styled.div`
    display:flex;
    color:white;
    justify-self: center;
    &>label{
        padding-right:10px;
    }

`;




const footerTitleLabel = {
    text:"My Cards On Hand",
    type:"h2"
};



export const GameInProgressBoard = () => {
    const [isFooterVisible,setIsFooterVisible] = useState(true);

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
        <InProgressBoardContainer>
            <CurrentPlayerCardsContextProvider>
                <GameBoardArea/>
                    <InProgressBoardFooter isFooterVisible={isFooterVisible}>
                    <FooterTitleContainer onClick={()=>setIsFooterVisible(!isFooterVisible)} >
                        <MonopolyDealLabel {...footerTitleLabel} />    
                        {getIcon()}
                    </FooterTitleContainer>
                    {isFooterVisible &&
                        <CurrentPlayerCardsOnHand/>
                    }
                </InProgressBoardFooter>
            </CurrentPlayerCardsContextProvider>
            
        </InProgressBoardContainer>
    )
}
