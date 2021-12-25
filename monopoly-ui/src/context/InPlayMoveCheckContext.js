import React,{useContext,createContext,useReducer} from 'react'
import { ResourceTypes } from '../common/constants';

export const InPlayMoveCheckContext = createContext();


const initState = {
    listOfPossibleMoves:{
        selectablePlayers:[],
        selectableCards:[]
    },
    errors:null
  };


  const inPlayMoveCheckReducer =  (state,action)  =>{
    
    switch(action.type){
        case ResourceTypes.LoadResource:
            return {...state,listOfPossibleMoves:action.listOfPossibleMoves};
    }
}



export const InPlayMoveCheckContextProvider = ({children})=> {

    const [inPlayMoveCheckState,inPlayMoveCheckStateDispatch] = useReducer(inPlayMoveCheckReducer,initState)
   

    return (
        <InPlayMoveCheckContext.Provider
            value={{inPlayMoveCheckState,inPlayMoveCheckStateDispatch}}>
            {children}
        </InPlayMoveCheckContext.Provider>
    )
}

