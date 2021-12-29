import React from 'react'
import styled from 'styled-components'
import { getBackgroundColour } from '../../common/ImageHelpers';
import {PayeeTransactionStatusEnum,ActionTypesEnum} from '../../common/constants';
import { getColourName } from '../../common/GameHelpers';
import { PayeeTradeHeader } from '../atoms/PayeeTradeHeader';

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
            return ` requests $ ${transactionTracker?.requestedTotal} from `;
        case ActionTypesEnum.MultiplePlayerRent:
        case ActionTypesEnum.SinglePlayerRent:
        case ActionTypesEnum.DoubleTheRent:
            return ` requests $ ${transactionTracker?.requestedTotal} for ${getColourName(transactionTracker?.requestedColourId)} Rent from `;
        case ActionTypesEnum.DealBreaker:
            return ` steals ${getColourName(transactionTracker?.requestedColourId)} Set (${transactionTracker?.requestedGroupId}) from `;
        case ActionTypesEnum.ForcedDeal:
            return ` sends ${transactionTracker?.sendingGameCard?.name} and receives ${transactionTracker?.requestedGameCard?.name} from `;
        case ActionTypesEnum.SlyDeal:
            return ` steals ${transactionTracker?.requestedGameCard?.name} from `;

    }
}


export const TransactionTracker = ({gameMove,game,player}) => {

    const completedTransactions = gameMove.transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.Paid);
    const notPaidTransactions = gameMove.transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.NotPaid);
    const declinedTransactions = gameMove.transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.DeclinedTransactionaid);
    const playerDetails = game.players.find(p=>p.playerId==player.playerId);
    const tradePayeeTransaction = gameMove.transactionTracker.tradePayeeTransactions.find(trade => trade.targetPlayerId == player.playerId && trade.payeeTransactionStatus == PayeeTransactionStatusEnum.NotPaid);
  
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
                    {declinedTransactions.map((payeeTransaction,key)=>(
                        <React.Fragment key={payeeTransaction.targetPlayerId} >
                            <StyledMessageHeader imageId={payeeTransaction.targetPlayer.imageId}>{payeeTransaction.targetPlayer.playerName} </StyledMessageHeader>
                            {key==0 && key!=declinedTransactions.length-1 && <span>,</span>}
                        </React.Fragment>
                    ))}
                    cancelled transaction with Just Say No
                </div>
            }
            {tradePayeeTransaction &&
                <PayeeTradeHeader
                    tradePayeeTransaction={tradePayeeTransaction}
                    transactionTracker={gameMove.transactionTracker}
                    currentPlayer={player}
                    playerCardsOnField={[...playerDetails.cashPileCards,...playerDetails.propertyPileCards]}
                />
            }
        </StyledTransactionTracker>
    );
}


