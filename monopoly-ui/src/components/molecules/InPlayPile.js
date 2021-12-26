import React from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';
import {sortCardsByLastUpdateDate} from '../../common/GameHelpers'

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
    grid-template-rows: ${(props) =>`repeat(${props.total},90px)`};
    grid-template-columns: ${(props) =>`repeat(${props.total},50px)`};
`;
const StyledBorder = styled.div`
    border:2px solid white;
    display:grid;
    justify-items: flex-start;
    min-height:240px;
    max-width: 270px;
    padding: 5px;
    grid-template-columns:repeat(1,250px);
   
`;

const RepositionedCard = styled.div` 
    grid-row:${(props) =>`${props.position}/span ${props.total}`};
    grid-column:${(props) =>`${props.position}/span ${props.total}`};
`;

const StyledGroup = styled.div`
    grid-template-rows:repeat(2,20px);
`


export const InPlayPile = ({players,inPlayPileCards}) => {

    inPlayPileCards = sortCardsByLastUpdateDate(inPlayPileCards);
    //group by playerId
    const inPlayPileGroupedByPlayerId = inPlayPileCards.reduce((dict, inPlayPileCard) => {
      
        if(dict[inPlayPileCard.playerId])
            dict[inPlayPileCard.playerId].push(inPlayPileCard)
        else
            dict[inPlayPileCard.playerId]=[inPlayPileCard];
        return dict;
    },{});


    return (
        <StyledInPlayPile>
            <MonopolyDealLabel type="h2" text="-Card In Play Pile-" />
            <StyledBorder>
                {inPlayPileGroupedByPlayerId && Object.values(inPlayPileGroupedByPlayerId).map((inPlayGroup,key)=>{
                   
                    const playerName = players.find(player=>player.playerId==inPlayGroup[0].playerId).playerName;
                    return (
                    <StyledGroup key={key}>
                        <MonopolyDealLabel  type="h4" text={`played by ${playerName}:`} />
                        <StyledGrid  total={inPlayGroup.length}>
                            {inPlayGroup && inPlayGroup.map((inPileCard,key)=>(
                                <RepositionedCard key={key} position={key+1} total={inPlayGroup.length}>
                                    <MonopolyCard gameCard={inPileCard} cardType={CardTypeEnum.InPlayCard} key={key} isCardSelectable={false}/>
                                </RepositionedCard>
                            ))}
                        </StyledGrid>
                    </StyledGroup>
                    )
                })}
            </StyledBorder>
        </StyledInPlayPile>
    )
}
