import React,{useContext,createContext,useReducer} from 'react'
import { ResourceTypes } from '../common/constants';

export const PreMoveCheckContext = createContext();


const initState = {
    listOfPossibleMoves:[],
    errors:null
  };


  const preMoveCheckReducer =  (state,action)  =>{
    switch(action.type){
        case ResourceTypes.LoadResource:
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

