import React,{useContext,createContext,useReducer} from 'react'
import { ResourceTypes } from '../common/constants';

export const PropertyMoveCheckContext = createContext();


const initState = {
    listOfPossibleMoves:[],
    errors:null
  };


  const propertyMoveCheckReducer =  (state,action)  =>{
    switch(action.type){
        case ResourceTypes.LoadResource:
            return {...state,listOfPossibleMoves:action.listOfPossibleMoves};
    }
}



export const PropertyMoveCheckContextProvider = ({children})=> {

    const [propertyMoveCheckState,propertyMoveCheckStateDispatch] = useReducer(propertyMoveCheckReducer,initState)
   

    return (
        <PropertyMoveCheckContext.Provider
            value={{propertyMoveCheckState,propertyMoveCheckStateDispatch}}>
            {children}
        </PropertyMoveCheckContext.Provider>
    )
}

