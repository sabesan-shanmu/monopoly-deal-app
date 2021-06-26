import React,{useReducer,createContext} from 'react'
import {ActionTypes} from "../common/constants";

export const GameContext = createContext();

const gameInitState = {
  game:null,
  errors:null
};


const gameReducer = (state,action)=>{
    switch(action.type){
        case ActionTypes.CreateResource:
          return {...state,game:action.game};
        case ActionTypes.GetResource:
          break;
    }

}

export const GameContextProvider = ({children}) => {
 
  const [gameState,gameDispatch] = useReducer(gameReducer,gameInitState)

  return (
    <GameContext.Provider
    
      value={{gameState,gameDispatch}}>
      {children}
    </GameContext.Provider>
  );
};
  