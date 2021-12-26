import React,{useContext} from 'react'
import styled from 'styled-components'
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum,TransactionTrackerStatusEnum } from '../../common/constants';
import { InPlayMoveCheckContext } from '../../context/InPlayMoveCheckContext';
import { SelectionMoveCheckContext } from '../../context/SelectionMoveCheckContext';
import { PropertyMoveCheckContext } from '../../context/PropertyMoveCheckContext';
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

    propertyPileCards = sortCardsByLastUpdateDate(propertyPileCards);
    const cashTotal = getCardSetTotal(propertyPileCards);
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext)
    const {inPlayMoveCheckState,inPlayMoveCheckStateDispatch} = useContext(InPlayMoveCheckContext);
    const {selectionMoveCheckState,selectionMoveCheckStateDispatch} = useContext(SelectionMoveCheckContext); 
    const {propertyMoveCheckState,propertyMoveCheckStateDispatch} = useContext(PropertyMoveCheckContext);
    
    const transactionTrackerStatus = gameMoveState.gameMove?.transactionTracker?.transactionTrackerStatus;

    const getListOfPossibleMoves = (propertyCard) => {
        
        switch(transactionTrackerStatus)
        {
            case TransactionTrackerStatusEnum.CurrentPlayerSelection:
                return (inPlayMoveCheckState?.listOfPossibleMoves?.selectableCards.filter(t=>t.gameCardId == propertyCard.gameCardId));
            case TransactionTrackerStatusEnum.OtherPlayerSelection:
                return (selectionMoveCheckState?.listOfPossibleMoves?.selectableCards.filter(t=>t.gameCardId == propertyCard.gameCardId));
            default: //TODO: in theory this should be find, will need to check to see if this causes issue
                return (propertyMoveCheckState?.listOfPossibleMoves.filter(t=>t.gameCardId == propertyCard.gameCardId));
        }
    }

    

    //group by groupId
    const propertyPileGroupedByGroupId= propertyPileCards.reduce((dict, propertyPileCard) => {
        if(dict[propertyPileCard.assignedColourId])
            dict[propertyPileCard.assignedColourId].push(propertyPileCard)
        else
            dict[propertyPileCard.assignedColourId]=[propertyPileCard];
        return dict;
    },[]);
    return (
        <React.Fragment>
            <MonopolyDealLabel type="h2" text={`Properties Pile : $ ${cashTotal}`} />
            <StyledBorder total={propertyPileCards.length} >
                {propertyPileGroupedByGroupId && Object.values(propertyPileGroupedByGroupId).map((propertyPileGroup,key)=>{
                    return (
                    <StyledGrid key={key} total={propertyPileGroup.length}>
                        {propertyPileGroup && propertyPileGroup.map((propertyCard,key)=>{
                            const listOfPossibleMoves= getListOfPossibleMoves(propertyCard);
                            const isCardSelectable = listOfPossibleMoves?.length>0;
                         
                            
                            return (
                            <RepositionedCard key={key} position={key+1} total={propertyPileCards.length}>
                                <MonopolyCard gameCard={propertyCard} cardType={CardTypeEnum.FaceUpCard} 
                                isCardSelectable={isCardSelectable} listOfPossibleMoves={listOfPossibleMoves}
                                popoverType={transactionTrackerStatus} />
                            </RepositionedCard>
                            )
                        })}
                    </StyledGrid>
                    )
                })}
            </StyledBorder>
        </React.Fragment>
        
    )
}
