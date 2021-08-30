import React,{useReducer,createContext,useContext,useEffect} from 'react'
import {ActionTypes} from "../common/constants";
import { SocketContext } from './SocketContext';
import {useHistory} from 'react-router-dom'
import {gamesApi} from '../api/gamesApi'

export const GameContext = createContext();

const gameInitState = {
  game:null,
  errors:null
};


const gameReducer = (state,action)=>{
    switch(action.type){
        case ActionTypes.CreateResource:
          return {...state,game:action.game};
       case ActionTypes.DeleteResource:
          return {...state,game:null};
    }

}

export const GameContextProvider = ({children}) => {
 
  const [gameState,gameDispatch] = useReducer(gameReducer,gameInitState)
  const {socket} = useContext(SocketContext); 
  const history = useHistory();
  
  useEffect(()=>{
    let isMounted = true;
    

    gamesApi.get(children.props.gamePassCode).then((success)=>{
      console.log(success.data);
      if(isMounted)
        gameDispatch({type:ActionTypes.CreateResource,game:success.data});
    }).catch((error)=>{
      console.log(error.response.data);
      history.push('/games-list');
    })
    

    return () =>{
      isMounted = false
      
    }
  },[])
  return (
    <GameContext.Provider
    
      value={{gameState,gameDispatch}}>
      {children}
    </GameContext.Provider>
  );
};
  