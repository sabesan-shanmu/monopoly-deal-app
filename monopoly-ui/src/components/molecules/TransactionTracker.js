import React from 'react'
import styled from 'styled-components'
import { getBackgroundColour } from '../../common/ImageHelpers';
import {PayeeTransactionStatusEnum,ActionTypesEnum} from '../../common/constants';
import { getColourName } from '../../common/GameHelpers';
const StyledTransactionTracker = styled.div`
    margin-top:3px;
    padding:3px;
`;
const StyledMessageHeader = styled.span`
    background-color:${({imageId})=>getBackgroundColour(imageId,"secondary")};
    color:${({imageId})=>getBackgroundColour(imageId,"text")};
    border: 2px solid black;
    padding:1px;
    border-radius:2px;
`

const getTransaction = (transactionTracker) =>{

    switch(transactionTracker.actionType)
    {
        case ActionTypesEnum.ItsMyBirthday:
        case ActionTypesEnum.DebtCollector:
            return ` requests $ ${transactionTracker.requestedTotal} from `;
        case ActionTypesEnum.MultiplePlayerRent:
        case ActionTypesEnum.SinglePlayerRent:
        case ActionTypesEnum.DoubleTheRent:
            return ` requests $ ${transactionTracker.requestedTotal} for ${getColourName(transactionTracker.requestedColourId)} Rent from `;
        case ActionTypesEnum.DealBreaker:
            return ` requests ${getColourName(transactionTracker.requestedColourId)} Set (${transactionTracker.requestedGroupId}) from `;
        case ActionTypesEnum.ForcedDeal:
            return ` requests ${transactionTracker.sendingGameCard.name}} for ${transactionTracker.requestGameCard.name}) from `;
        case ActionTypesEnum.SlyDeal:
            return ` requests ${transactionTracker.requestGameCard.name}} from `;

    }
}


export const TransactionTracker = ({gameMove,game,player}) => {
    console.log(gameMove);
    const completedTransactions = gameMove.transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.Paid);
    const notPaidTransactions = gameMove.transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.NotPaid);
    const declinedTransactions = gameMove.transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.DeclinedTransactionaid);
    return ( 
        <StyledTransactionTracker>
            {notPaidTransactions.length>0 &&
                <div>
                    <StyledMessageHeader imageId={gameMove.transactionTracker.performedByPlayer.imageId}>{gameMove.transactionTracker.performedByPlayer.playerName} </StyledMessageHeader>  
                    {getTransaction(gameMove.transactionTracker)}
                    {notPaidTransactions.map((payeeTransaction,key)=>(
                        <React.Fragment key={payeeTransaction.targetPlayerId} >
                            <StyledMessageHeader imageId={payeeTransaction.targetPlayer.imageId}>{payeeTransaction.targetPlayer.playerName} </StyledMessageHeader>
                            {key==0 && key!=notPaidTransactions.length-1 && <span>,</span>}
                        </React.Fragment>
                    ))}
                </div>
            }
            {completedTransactions.length>0 &&
                <div>
                     {completedTransactions.map((payeeTransaction,key)=>(
                        <React.Fragment key={payeeTransaction.targetPlayerId} >
                            <StyledMessageHeader imageId={payeeTransaction.targetPlayer.imageId}>{payeeTransaction.targetPlayer.playerName} </StyledMessageHeader>
                            {key==0 && key!=completedTransactions.length-1 && <span>,</span>}
                        </React.Fragment>
                    ))}
                    completed transaction
                </div>
            }
            {declinedTransactions.length>0 &&
                <div>
                    {completedTransactions.map((payeeTransaction,key)=>(
                        <React.Fragment key={payeeTransaction.targetPlayerId} >
                            <StyledMessageHeader imageId={payeeTransaction.targetPlayer.imageId}>{payeeTransaction.targetPlayer.playerName} </StyledMessageHeader>
                            {key==0 && key!=completedTransactions.length-1 && <span>,</span>}
                        </React.Fragment>
                    ))}
                    cancelled transaction with Just Say No
                </div>
            }
        </StyledTransactionTracker>
    );
}


