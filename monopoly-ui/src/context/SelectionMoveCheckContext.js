import React,{useContext,createContext,useReducer} from 'react'
import { ResourceTypes } from '../common/constants';

export const SelectionMoveCheckContext = createContext();


const initState = {
    listOfPossibleMoves:{
        selectablePlayers:[],
        selectableCards:[]
    },
    errors:null
  };


  const selectionMoveCheckReducer =  (state,action)  =>{
    switch(action.type){
        case ResourceTypes.LoadResource:
            return {...state,listOfPossibleMoves:action.listOfPossibleMoves};
    }
}



export const SelectionMoveCheckContextProvider = ({children})=> {

    const [selectionMoveCheckState,selectionMoveCheckStateDispatch] = useReducer(selectionMoveCheckReducer,initState)
   

    return (
        <SelectionMoveCheckContext.Provider
            value={{selectionMoveCheckState,selectionMoveCheckStateDispatch}}>
            {children}
        </SelectionMoveCheckContext.Provider>
    )
}

