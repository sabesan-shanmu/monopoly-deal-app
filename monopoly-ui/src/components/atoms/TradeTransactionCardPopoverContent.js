import React,{useContext} from 'react'
import styled from 'styled-components'
import { TradeTransactionContext } from '../../context/TradeTransactionContext'
import { ResourceTypes } from '../../common/constants';

const StyledPopoverContent = styled.div`
    width:115 px;
    color:white;
    border:1px solid white;
    padding:3px;
    border-radius:2px;
`;

const StyledPopoverHeader = styled.div`
    background-color:#382F2F;
    color:white;
`;

const StyledPopoverBody = styled.div`
    background-color:white;
    color:black;
    cursor:pointer;
    &:hover{
        background-color:#AFAFAF;
    }
`;




export const TradeTransactionCardPopoverContent = ({gameCard,listOfPossibleMoves,setIsPopoverOpen}) =>{
    const {tradeTransactionState,tradeTransactionsDispatch} = useContext(TradeTransactionContext);
    const updateTransactionTracker = (move) =>{
        tradeTransactionsDispatch({   
            type:ResourceTypes.UpdateResource,
            selectedGameCard:{
                gameCardId:move.gameCardId,
                gameCard:move.gameCard,
                isSelected:!move.isSelected
            }
        })

    }

    return (
        <StyledPopoverContent>
            <StyledPopoverHeader>Choose an Action:</StyledPopoverHeader>
            {listOfPossibleMoves.map((move,key)=>
                <StyledPopoverBody key={key} onClick={()=>{
                    updateTransactionTracker(move);
                    setIsPopoverOpen(false);
                }}>{`${move.isSelected?"Remove":"Add"} $ ${move.gameCard.card.price} Card`}</StyledPopoverBody>
            )}
        </StyledPopoverContent>
    )
}

