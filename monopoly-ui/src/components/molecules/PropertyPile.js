import React from 'react'
import styled from 'styled-components'
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';

const StyledBorder = styled.div`
    border:2px solid white;
    min-height:210px;
`;

const RepositionedCard = styled.div`
    
    grid-row:${(props) =>`${props.position}/span ${props.total}`};
    grid-column:${(props) =>`${props.position}/span ${props.total}`};
`;



export const PropertyPile = ({propertyPileCards}) => {
    console.log(propertyPileCards);

    return (
        <React.Fragment>
            <MonopolyDealLabel type="h4" text="-Properties-" />
            <StyledBorder total={propertyPileCards?propertyPileCards.length:1}>
                {propertyPileCards && propertyPileCards.map((propertyCard,key)=>(
                    <RepositionedCard position={key+1} total={propertyPileCards.length}>
                        <MonopolyCard gameCard={propertyCard} cardType={CardTypeEnum.FaceUpCard} key={key} isCardSelectable={true}/>
                    </RepositionedCard>
                ))}
       
            </StyledBorder>
        </React.Fragment>
        
    )
}
