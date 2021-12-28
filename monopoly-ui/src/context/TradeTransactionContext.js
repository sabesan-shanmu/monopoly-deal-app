import React,{useContext,createContext,useReducer} from 'react'
import { ResourceTypes } from '../common/constants';



export const TradeTransactionContext = createContext()

const initState = {
    listOfPossibleMoves:[],
    expectedTotal:null,
    runningTotal:0,
    selectedGameCard:null,
    isTradeAllowed:false
}

const tradeTransactionsReducer =  (currentState,action)  =>{
    
    switch(action.type){
        case ResourceTypes.LoadResource:
            return {...currentState,listOfPossibleMoves:action.listOfPossibleMoves,expectedTotal:action.expectedTotal,isTradeAllowed:action.isTradeAllowed};
        case ResourceTypes.UpdateResource:
            if(!action.selectedGameCard)
                return {...currentState};

            let updatedListOfPossibleMoves = currentState.listOfPossibleMoves;
            let foundIndex = updatedListOfPossibleMoves.findIndex(x => x.gameCardId == action.selectedGameCard.gameCardId);
            updatedListOfPossibleMoves[foundIndex] = action.selectedGameCard;
            let runningTotal = updatedListOfPossibleMoves.reduce((total, item) => total + item.isSelected?item.gameCard.card.price:0, 0);

            return {...currentState,listOfPossibleMoves:updatedListOfPossibleMoves,runningTotal:runningTotal};
    }
}

export const TradeTransactionContextProvider = ({children}) => {

    const [tradeTransactionState,tradeTransactionsDispatch] = useReducer(tradeTransactionsReducer,initState)
   


    return (
        <TradeTransactionContext.Provider
            value={{tradeTransactionState,tradeTransactionsDispatch}}>
            {children}
        </TradeTransactionContext.Provider>
    )
}

