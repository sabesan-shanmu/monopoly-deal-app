import React,{useEffect,useReducer,useContext} from 'react'
import { ActionTypes } from '../common/constants';
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
        case ActionTypes.CreateResource:
            if(!state.games)
                return {...state}
            console.log(`searching game:${action.data.gamePassCode}`);
            const foundIndex = state.games.findIndex(game=>{return game.gamePassCode == action.data.gamePassCode });
            const games = [];
            if(foundIndex>-1)
                return {games:state.games.map(game =>{ return game.gamePassCode == action.data.gamePassCode?action.data:game})};
            else
                return {games:state.games.push(action.data)};
        case ActionTypes.GetAllResources:
            return {...state,games:action.data,isLoading:false};
        case ActionTypes.LoadResource:
            return {...state,isLoading:true};
    }

}


export const GamesListContextProvider = ({children}) => {

    const [gamesListState,gamesListDispatch] = useReducer(gamesListReducer,gamesListInitState);
    const {socket} = useContext(SocketContext); 

   
    
    useEffect(()=>{

          
        socket.on("create_game", (created_game) => {
            console.log("created_game fired!");
            console.log(created_game);
            gamesListDispatch({type:ActionTypes.CreateResource,data:created_game});
        });
    

        gamesApi.getAll().then((success)=>{
            console.log(success.data);
            gamesListDispatch({type:ActionTypes.GetAllResources,data:success.data});
        }).catch((error)=>{
            console.log(error.response.data);
        })

         
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





