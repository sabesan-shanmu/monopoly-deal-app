import React from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';

const StyledInPlayPile = styled.div`
    min-width: 280px;
    display:flex;
    flex-direction:column;
    height:100%;
    justify-content: center;
    align-items: center;
`;
const StyledGrid = styled.div`
    display:grid;
    position:relative;
    grid-template-rows: ${(props) =>`repeat(${props.total},30px)`};
    grid-template-columns: ${(props) =>`repeat(${props.total},20px)`};
`;
const StyledBorder = styled.div`
    border:2px solid white;
    display:grid;
    justify-items: flex-start;
    min-height:240px;
    width: 240px;
    padding: 5px;
`;

const RepositionedCard = styled.div`
    
    grid-row:${(props) =>`${props.position}/span ${props.total}`};
    grid-column:${(props) =>`${props.position}/span ${props.total}`};
`;


export const InPlayPile = ({inPlayPileCards}) => {
    console.log(inPlayPileCards);

    //group by playerId
    const inPlayPileGroupedByPlayerId = inPlayPileCards.reduce((dict, inPlayPileCard) => {
      
        if(dict[inPlayPileCard.playerId])
            dict[inPlayPileCard.playerId].push(inPlayPileCard)
        else
            dict[inPlayPileCard.playerId]=[inPlayPileCard];
        return dict;
    },{});
    console.log(inPlayPileGroupedByPlayerId);

    return (
        <StyledInPlayPile>
            <MonopolyDealLabel type="h4" text="-Card In Play Pile-" />
            <StyledBorder>
                {inPlayPileGroupedByPlayerId && Object.values(inPlayPileGroupedByPlayerId).map((inPlayGroup,key)=>{
                    console.log(inPlayGroup);
                    return (
                    <StyledGrid key={key} total={inPlayGroup.length}>
                        {inPlayGroup && inPlayGroup.map((inPileCard,key)=>(
                            <RepositionedCard position={key+1} total={inPlayGroup.length}>
                                <MonopolyCard gameCard={inPileCard} cardType={CardTypeEnum.FaceUpCard} key={key} isCardSelectable={false}/>
                            </RepositionedCard>
                        ))}
                    </StyledGrid>
                    )
                })}
            </StyledBorder>
        </StyledInPlayPile>
    )
}
