import React,{useReducer,useState,createContext,useEffect} from 'react'
import {ResourceTypes} from "../common/constants";
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
        case ResourceTypes.CreateResource:
            return {...state,player:action.player};
        case ResourceTypes.DeleteResource:
            return {...state,player:null,errors:null};
        case ResourceTypes.UpdateResource:
            return {...state,player:action.player};
        case ResourceTypes.GetResource:
            return {...state};
    }

}



export const PlayerContextProvider = ({children}) => {

    const [playerState,playerDispatch] = useReducer(playerReducer,playerInitState)
    const history = useHistory();

    useEffect(()=>{
        let isMounted = true
        sessionsApi.get()
        .then(function(success){
            console.log(success.data);
            if(isMounted){
                const playerData = getDecodedPlayer(success.data);
                playerDispatch({type:ResourceTypes.CreateResource,player:playerData});
                history.push(`/${playerData.gamePassCode}/game-board`);
            }
        })
        .catch(function(error){
            console.log(error.response.data);
            if(history.location.pathname.indexOf("game-board")>-1)
                history.push(history.location.pathname.replace("game-board","join-game"));
        });

        return () => { isMounted = false }; 
    },[]);
    
    return (
        <PlayerContext.Provider

        value={{playerState,playerDispatch}}>
        {children}
        </PlayerContext.Provider>
    );

}