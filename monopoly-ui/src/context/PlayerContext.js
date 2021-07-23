import React,{useReducer,useState,createContext,useEffect} from 'react'
import {ActionTypes} from "../common/constants";
import {sessionsApi} from "../api/sessionsApi"
import {getDecodedPlayer} from "../adapters/playerAdapter"
import {useHistory} from 'react-router-dom'
export const PlayerContext = createContext();



const playerInitState = {
    player:null,
    errors:null
};

const playerReducer = (state,action)=>{
    switch(action.type){
        case ActionTypes.CreateResource:
          return {...state,player:action.player};
          case ActionTypes.DeleteResource:
          return {...state,player:null,errors:null};
        case ActionTypes.GetResource:
          return {...state};
    }

}



export const PlayerContextProvider = ({children}) => {

    const [playerState,playerDispatch] = useReducer(playerReducer,playerInitState)
    const history = useHistory();

    useEffect(()=>{
        sessionsApi.get()
        .then(function(success){
            console.log(success.data);
            const playerData = getDecodedPlayer(success.data);
            playerDispatch({type:ActionTypes.CreateResource,player:playerData});
            history.push(`/${playerData.gamePassCode}/game-board`);
        })
        .catch(function(error){
            console.log(error.response.data);
            if(history.location.pathname.indexOf("game-board")>-1)
                history.push(history.location.pathname.replace("game-board","join-game"));
        });
    },[]);
    
    return (
        <PlayerContext.Provider

        value={{playerState,playerDispatch}}>
        {children}
        </PlayerContext.Provider>
    );

}