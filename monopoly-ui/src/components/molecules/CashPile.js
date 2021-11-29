import React from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';
import {sortCardsByLastUpdateDate,getCardSetTotal } from '../../common/GameHelpers'


const StyledBorder = styled.div`
    border:2px solid white;
    display:grid;
    justify-items: flex-start;
    position:relative;
    min-height:240px;
    max-width: 260px;
    padding:5px;
    overflow-x: auto;
    grid-template-columns: ${(props) =>`repeat(${props.total},40px)`};
`;

const RepositionedCard = styled.div`
    grid-columns:${(props) =>`${props.position}/span ${props.total}`};
    grid-columns:${(props) =>`${props.position}/span ${props.total}`};
`;



export const CashPile = ({cashPileCards}) => {

    cashPileCards = sortCardsByLastUpdateDate(cashPileCards);
    const cashTotal = getCardSetTotal(cashPileCards);
    return (
        <React.Fragment>
            <MonopolyDealLabel type="h2" text={`Cash Pile : $ ${cashTotal}`} />
            <StyledBorder total={cashPileCards?cashPileCards.length:1}>
                {cashPileCards && cashPileCards.map((cashCard,key)=>(
                    <RepositionedCard key={key} position={key+1} total={cashPileCards.length}>
                        <MonopolyCard gameCard={cashCard} cardType={CardTypeEnum.FaceUpCard} key={key} isCardSelectable={false}/>
                    </RepositionedCard>
                ))}
       
            </StyledBorder>
            
        </React.Fragment>
    )
}
