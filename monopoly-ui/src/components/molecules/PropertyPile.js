import React from 'react'
import styled from 'styled-components'
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';



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



export const PropertyPile = ({propertyPileCards}) => {
    console.log(propertyPileCards);
    //group by groupId
    const propertyPileGroupedByGroupId= propertyPileCards.reduce((dict, propertyPileCard) => {
        if(dict[propertyPileCard.groupId])
            dict[propertyPileCard.groupId].push(propertyPileCard)
        else
            dict[propertyPileCard.groupId]=[propertyPileCard];
        return dict;
    },[]);
    console.log(propertyPileGroupedByGroupId);
    return (
        <React.Fragment>
            <MonopolyDealLabel type="h4" text="-Properties Pile-" />
            <StyledBorder>
                {propertyPileGroupedByGroupId && Object.values(propertyPileGroupedByGroupId).map((propertyPileGroup,key)=>{
                    return (
                    <StyledGrid key={key} total={propertyPileGroup.length}>
                        {propertyPileGroup && propertyPileGroup.map((propertyCard,key)=>(
                            <RepositionedCard position={key+1} total={propertyPileCards.length}>
                                <MonopolyCard gameCard={propertyCard} cardType={CardTypeEnum.FaceUpCard} key={key} isCardSelectable={false}/>
                            </RepositionedCard>
                        ))}
                    </StyledGrid>
                    )
                })}
            </StyledBorder>
        </React.Fragment>
        
    )
}
