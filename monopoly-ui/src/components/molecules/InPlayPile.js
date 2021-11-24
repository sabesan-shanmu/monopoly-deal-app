import React from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';

const StyledInPlayPile = styled.div`
    min-width: 280px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    height:100%;
`;

const StyledBorder = styled.div`
    border:2px solid white;
    display:grid;
    width: 240px;
    justify-items: center;
    position:relative;
    min-height:240px;
`;

const RepositionedCard = styled.div`
    
    grid-row:${(props) =>`${props.position}/span ${props.total}`};
    grid-column:${(props) =>`${props.position}/span ${props.total}`};
`;


export const InPlayPile = ({inPlayPileCards}) => {
    console.log(inPlayPileCards);

    //group by playerId
    return (
        <StyledInPlayPile>
            <MonopolyDealLabel type="h4" text="-Card In Play Pile-" />
            <StyledBorder total={inPlayPileCards?inPlayPileCards.length:1}>
                {inPlayPileCards && inPlayPileCards.map((pileCard,key)=>(
                    <RepositionedCard position={key+1} total={inPlayPileCards.length}>
                     <MonopolyCard gameCard={pileCard} cardType={CardTypeEnum.InPlayCard} key={key} isCardSelectable={true}/>
                    </RepositionedCard>
                ))}
       
            </StyledBorder>
        </StyledInPlayPile>
    )
}
