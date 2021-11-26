import React from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';
import {sortCardsByLastUpdateDate } from '../../common/GameHelpers'


const StyledBorder = styled.div`
    border:2px solid white;
    display:grid;
    justify-items: flex-start;
    position:relative;
    min-height:240px;
    min-width: 240px;
    padding:5px;
    grid-template-rows: ${(props) =>`repeat(${props.total},30px)`};
    grid-template-columns: ${(props) =>`repeat(${props.total},20px)`};
`;

const RepositionedCard = styled.div`
    
    grid-row:${(props) =>`${props.position}/span ${props.total}`};
    grid-column:${(props) =>`${props.position}/span ${props.total}`};
`;



export const CashPile = ({cashPileCards}) => {
    console.log(cashPileCards);
    cashPileCards = sortCardsByLastUpdateDate(cashPileCards);
    console.log(cashPileCards);
    return (
        <React.Fragment>
            <MonopolyDealLabel type="h4" text="-Cash Pile-" />
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
