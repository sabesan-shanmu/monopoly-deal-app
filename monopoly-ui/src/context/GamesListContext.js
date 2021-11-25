import React,{useEffect,useReducer,useContext} from 'react'
import { ResourceTypes } from '../common/constants';
import {gamesApi} from '../api/gamesApi';
import { SocketContext } from './SocketContext';

export const GamesListContext = React.createContext();



const gamesListInitState = {
    games:null,
    isLoading:true,
    errors:null
};



const gamesListReducer = (state,action)=>{

    switch(action.type){
        case ResourceTypes.CreateResource:
        case ResourceTypes.UpdateResource:
            if(!state.games)
                return {...state}
            console.log(`searching game:${action.data.gamePassCode}`);
            const foundIndex = state.games.findIndex(game=>{return game.gamePassCode == action.data.gamePassCode });
         
            if(foundIndex>-1)
                return {games:state.games.map(game =>{ return game.gamePassCode == action.data.gamePassCode?action.data:game})};
            else
                return {games:state.games.push(action.data)};
        case ResourceTypes.GetAllResources:
            return {...state,games:action.data,isLoading:false};
        case ResourceTypes.LoadResource:
            return {...state,isLoading:true};      
        
    }

}


export const GamesListContextProvider = ({children}) => {

    const [gamesListState,gamesListDispatch] = useReducer(gamesListReducer,gamesListInitState);
    const {socket} = useContext(SocketContext); 

   
    
    useEffect(()=>{

        let isMounted = true;      
        socket.on("create_game", (created_game) => {
            console.log("created_game fired!");
            console.log(created_game);
            if(isMounted)
                gamesListDispatch({type:ResourceTypes.CreateResource,data:created_game});
        });
    
             
        socket.on("update_game", (update_game) => {
            console.log("update_game fired!");
            console.log(update_game);
            if(isMounted)
                gamesListDispatch({type:ResourceTypes.UpdateResource,data:update_game});
        });
    

        gamesApi.getAll().then((success)=>{
            console.log(success.data);
            if(isMounted)
                gamesListDispatch({type:ResourceTypes.GetAllResources,data:success.data});
        }).catch((error)=>{
            console.log(error.response.data);
        })

        return () => { isMounted = false }; 
    },[])
    

    return (
        <GamesListContext.Provider 
            value={{
                gamesListState,gamesListDispatch
            }}>
            {children}
        </GamesListContext.Provider>
    )
} 





