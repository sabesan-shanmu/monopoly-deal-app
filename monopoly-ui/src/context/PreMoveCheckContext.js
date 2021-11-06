import React,{useContext,createContext,useReducer} from 'react'
import { ActionTypes } from '../common/constants';

export const PreMoveCheckContext = createContext();


const initState = {
    listOfPossibleMoves:[],
    errors:null
  };


  const preMoveCheckReducer =  (state,action)  =>{
    switch(action.type){
        case ActionTypes.LoadResource:
            return {...state,listOfPossibleMoves:action.listOfPossibleMoves};
    }
}



export const PreMoveCheckContextProvider = ({children})=> {

    const [preMoveCheckState,preMoveCheckStateDispatch] = useReducer(preMoveCheckReducer,initState)
   

    return (
        <PreMoveCheckContext.Provider
            value={{preMoveCheckState,preMoveCheckStateDispatch}}>
            {children}
        </PreMoveCheckContext.Provider>
    )
}

