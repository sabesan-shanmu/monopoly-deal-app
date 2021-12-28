import React,{useContext,useEffect,useState} from 'react'
import { TradeTransactionContext } from '../../context/TradeTransactionContext'
import { CurrentPlayerCardsContext } from '../../context/CurrentPlayerCardsOnHandContext';
import { ActionTypesEnum,ResourceTypes,PayeeTransactionStatusEnum } from '../../common/constants';
import styled from 'styled-components';
import { MonopolyDealLabel } from './MonopolyDealLabel';
import { MonopolyDealButton } from './MonopolyDealButton';
import { getGameCardFormat } from '../../common/GameMoveHelpers';
import { FormError } from './FormError';
import { singleTradePayeeTransactionApi } from '../../api/tradePayeeTransactionApi';

export const StyledTransactionChoiceHeader = styled.div`
    margin-top:5px;
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    align-items: center;
    width:100%;
    &>button{
        flex:2;
        max-width:200px;
        margin:2px;
    }
`

export const PayeeTradeHeader = ({tradePayeeTransaction,transactionTracker,currentPlayer,playerCardsOnField}) => {
    const {tradeTransactionState,tradeTransactionsDispatch} = useContext(TradeTransactionContext);
    const {currentPlayerCardsState,currentPlayerCardsStateDispatch} = useContext(CurrentPlayerCardsContext);
    const [transactionErrors,setTransactionErrors] = useState(null);

    
    const isPaymentTransaction = [ActionTypesEnum.DoubleTheRent,
        ActionTypesEnum.SinglePlayerRent,
        ActionTypesEnum.MultiplePlayerRent,
        ActionTypesEnum.ItsMyBirthday,
        ActionTypesEnum.DebtCollector].includes(transactionTracker.actionType);
    const isDealerBreaker = [ActionTypesEnum.DealBreaker].includes(transactionTracker.actionType);
    const isSlyDeal = [ActionTypesEnum.SlyDeal,ActionTypesEnum.ForcedDeal].includes(transactionTracker.actionType);
    const isForcedDeal = [ActionTypesEnum.ForcedDeal].includes(transactionTracker.actionType);
    const JustSayNoCard = currentPlayerCardsState.playerCards.find(p=>p?.card?.action?.actionType == ActionTypesEnum.JustSayNo);

    const completeBtn = {
        label:"Complete",
        disabled:false,
        onClick:(e)=>{
            const tradePayeeTransactionPayload = {
                tradePayeeTransactionId:tradePayeeTransaction.tradePayeeTransactionId,
                payeeTransactionStatus:PayeeTransactionStatusEnum.Paid,
                sendingGameCards:tradeTransactionState.listOfPossibleMoves.filter(move=>move.isSelected).map(c=>getGameCardFormat(c.gameCard)),
                receivingGameCard:isForcedDeal?getGameCardFormat(transactionTracker.sendingGameCard):null
            }
            singleTradePayeeTransactionApi.put(tradePayeeTransaction.links.self,currentPlayer.accessToken,tradePayeeTransactionPayload)
                .then(function(success){
                    console.log(success.data);     
                    setTransactionErrors(null);
                    tradeTransactionsDispatch({   
                        type:ResourceTypes.LoadResource,
                        listOfPossibleMoves:[],
                        expectedTotal:null,
                        isTradeAllowed:false
                    })               
                })
                .catch(function(error){
                    setTransactionErrors(error.response.data);
                    console.log(error.response.data);
                    
                });
            e.preventDefault();
        }
    }
    const justSayNoBtn = {
        label:"Just Say No",
        disabled:!JustSayNoCard || tradeTransactionState.listOfPossibleMoves.length == 0 ?true:false,
        onClick:(e)=>{
            const tradePayeeTransactionPayload = {
                tradePayeeTransactionId:tradePayeeTransaction.tradePayeeTransactionId,
                payeeTransactionStatus:PayeeTransactionStatusEnum.DeclinedTransaction,
                sendingGameCards:[getGameCardFormat(JustSayNoCard)],
                receivingGameCard:null
            }
            setTransactionErrors(null);
            singleTradePayeeTransactionApi.put(tradePayeeTransaction.links.self,currentPlayer.accessToken,tradePayeeTransactionPayload)
                .then(function(success){
                    console.log(success.data);
                    setTransactionErrors(null);
                    tradeTransactionsDispatch({   
                        type:ResourceTypes.LoadResource,
                        listOfPossibleMoves:[],
                        expectedTotal:null,
                        isTradeAllowed:false
                    })
                })
                .catch(function(error){
                    setTransactionErrors(error.response.data);
                    console.log(error.response.data);   
                });
        }
    }



    useEffect(()=>{
        
        const valuedCards = playerCardsOnField.reduce((list,playerCard)=>{
            if (isPaymentTransaction && playerCard.card.price != 0)
                list.push({gameCardId:playerCard.gameCardId,gameCard:playerCard,isSelected:false});
            else if(isDealerBreaker && transactionTracker.requestedGroupId == playerCard.groupId)
                list.push({gameCardId:playerCard.gameCardId,gameCard:playerCard,isSelected:true});
            else if((isSlyDeal || isForcedDeal) && transactionTracker.requestedGameCardId == playerCard.gameCardId)   
                list.push({gameCardId:playerCard.gameCardId,gameCard:playerCard,isSelected:true});
            return list;
        },[])

        tradeTransactionsDispatch({   
                type:ResourceTypes.LoadResource,
                listOfPossibleMoves:valuedCards,
                expectedTotal:transactionTracker.requestedTotal,
                isTradeAllowed:isPaymentTransaction?true:false
        })


    },[tradePayeeTransaction]);
    console.log(tradeTransactionState.listOfPossibleMoves);
    const selectedCards = tradeTransactionState.listOfPossibleMoves.filter(move=>move.isSelected).map(c=>c.gameCard.name).join(" , ");
    const selectedCardsTotal = tradeTransactionState.listOfPossibleMoves.filter(move=>move.isSelected).reduce((total, move) => total + (move.gameCard?.card?.price || 0 ) , 0);
    
    
    return (
            <React.Fragment>
                <div>
                    <MonopolyDealLabel type="h3" text={`Selected Transaction Cards:[ ${selectedCards} ]`} />
                </div>
                <div>
                    <MonopolyDealLabel type="h3" text={`Total Value $ ${selectedCardsTotal}`} />
                </div>
                <StyledTransactionChoiceHeader>
                    <MonopolyDealButton {...completeBtn}/>
                     -OR-
                    <MonopolyDealButton {...justSayNoBtn} />
                </StyledTransactionChoiceHeader>
                {transactionErrors &&
                            <FormError errors={transactionErrors}/>
                } 
            </React.Fragment>
    )
}


