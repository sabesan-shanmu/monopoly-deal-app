import React,{useContext} from 'react'
import styled from 'styled-components'
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';
import { PreMoveCheckContext } from '../../context/PreMoveCheckContext';
import { GameMoveContext } from '../../context/GameMoveContext';
import {sortCardsByLastUpdateDate,getCardSetTotal} from '../../common/GameHelpers'


const StyledGrid = styled.div`
    display:grid;
    position:relative;
    grid-template-rows: ${(props) =>`repeat(${props.total},30px)`};
    grid-template-columns: ${(props) =>`repeat(${props.total},20px)`};
    margin:5px;
`;
const StyledBorder = styled.div`
    border:2px solid white;
    display:grid;
    justify-items: flex-start;
    min-height:240px;
    max-width: 275px;
    column-gap: 5px;
    //grid-template-columns: ${(props) =>`repeat(${props.total},130px)`};
    grid-template-columns: ${(props) =>`repeat(2,130px)`};
  
`;

const RepositionedCard = styled.div`
    
    grid-row:${(props) =>`${props.position}/span ${props.total}`};
    grid-column:${(props) =>`1/span ${props.total}`};
`;



export const PropertyPile = ({propertyPileCards}) => {
    console.log(propertyPileCards);
    propertyPileCards = sortCardsByLastUpdateDate(propertyPileCards);
    const cashTotal = getCardSetTotal(propertyPileCards);
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext)
    const {preMoveCheckState,preMoveCheckStateDispatch} = useContext(PreMoveCheckContext);

    const isCardPlayable = (playerCard)=>{
        return (preMoveCheckState.listOfPossibleMoves.find(t=>t.gameCardId == playerCard.gameCardId))?.possibleMoves?.length>0?true:false;
    }
    const listOfPossibleMoves = (playerCard)=>{
        return (preMoveCheckState.listOfPossibleMoves.find(t=>t.gameCardId == playerCard.gameCardId));
    }
    

    //group by groupId
    const propertyPileGroupedByGroupId= propertyPileCards.reduce((dict, propertyPileCard) => {
        if(dict[propertyPileCard.assignedColourId])
            dict[propertyPileCard.assignedColourId].push(propertyPileCard)
        else
            dict[propertyPileCard.assignedColourId]=[propertyPileCard];
        return dict;
    },[]);
    console.log(propertyPileGroupedByGroupId);
    return (
        <React.Fragment>
            <MonopolyDealLabel type="h2" text={`Properties Pile : $ ${cashTotal}`} />
            <StyledBorder total={propertyPileCards.length} >
                {propertyPileGroupedByGroupId && Object.values(propertyPileGroupedByGroupId).map((propertyPileGroup,key)=>{
                    return (
                    <StyledGrid key={key} total={propertyPileGroup.length}>
                        {propertyPileGroup && propertyPileGroup.map((propertyCard,key)=>(
                            <RepositionedCard position={key+1} total={propertyPileCards.length}>
                                <MonopolyCard gameCard={propertyCard} cardType={CardTypeEnum.FaceUpCard} key={key} 
                                isCardSelectable={isCardPlayable(propertyCard) && !gameMoveState.gameMove.transactionTracker} listOfPossibleMoves={listOfPossibleMoves(propertyCard)}/>
                            </RepositionedCard>
                        ))}
                    </StyledGrid>
                    )
                })}
            </StyledBorder>
        </React.Fragment>
        
    )
}
