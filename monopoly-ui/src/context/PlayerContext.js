import React,{useReducer,useState,createContext,useEffect} from 'react'
import {ResourceTypes} from "../common/constants";
import {sessionsApi} from "../api/sessionsApi"
import {playersApi} from "../api/playersApi"
import {getDecodedPlayer} from "../adapters/playerAdapter"
import {saveTokens,loadTokens,clearTokens} from "../common/tokenStorage"
import {useHistory} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
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



const TOKEN_EXPIRY_MARGIN_SECONDS = 30;

const restorePlayerTokens = () => {
    const tokens = loadTokens();
    if(!tokens)
        return sessionsApi.get().then((success)=>success.data);

    const now = Date.now()/1000;
    try{
        const access = jwt_decode(tokens.accessToken);
        const refresh = jwt_decode(tokens.refreshToken);
        if(access.exp > now + TOKEN_EXPIRY_MARGIN_SECONDS)
            return Promise.resolve(tokens);
        if(refresh.exp > now + TOKEN_EXPIRY_MARGIN_SECONDS)
            return playersApi.refresh(refresh.identity.gamePassCode,tokens.refreshToken).then((success)=>success.data);
    }
    catch(e){
        // malformed tokens: fall through to the cookie session
    }
    clearTokens();
    return sessionsApi.get().then((success)=>success.data);
}

export const PlayerContextProvider = ({children}) => {

    const [playerState,playerDispatch] = useReducer(playerReducer,playerInitState)
    const history = useHistory();

    // Restore the logged-in player after a reload: tokens saved in this tab first, then the API's
    // session cookie (only sent by browsers that allow third-party cookies).
    useEffect(()=>{
        let isMounted = true
        restorePlayerTokens()
        .then(function(tokens){
            if(isMounted){
                const playerData = getDecodedPlayer(tokens);
                playerDispatch({type:ResourceTypes.CreateResource,player:playerData});
                history.push(`/${playerData.gamePassCode}/game-board`);
            }
        })
        .catch(function(error){
            console.log(error && error.response ? error.response.data : error);
            clearTokens();
            if(history.location.pathname.indexOf("game-board")>-1)
                history.push(history.location.pathname.replace("game-board","join-game"));
        });

        return () => { isMounted = false }; 
    },[]);

    // Persist tokens whenever login, register, vote or a refresh hands us new ones
    useEffect(()=>{
        if(playerState.player)
            saveTokens(playerState.player.accessToken,playerState.player.refreshToken);
    },[playerState.player]);

    return (
        <PlayerContext.Provider

        value={{playerState,playerDispatch}}>
        {children}
        </PlayerContext.Provider>
    );

}