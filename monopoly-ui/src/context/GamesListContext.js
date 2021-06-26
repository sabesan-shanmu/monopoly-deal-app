import React,{useEffect,useReducer} from 'react'
import { ActionTypes } from '../common/constants';
import {gamesApi} from '../api/gamesApi';

export const GamesListContext = React.createContext();



const gamesListInitState = {
    games:null,
    isLoading:true,
    errors:null
};



const gamesListReducer = (state,action)=>{

    switch(action.type){
        case ActionTypes.GetAllResources:
            return {...state,games:action.data,isLoading:false};
        case ActionTypes.LoadResource:
            return {...state,isLoading:true};
    }

}


export const GamesListContextProvider = ({children}) => {

    const [gamesListState,gamesListDispatch] = useReducer(gamesListReducer,gamesListInitState)

    
    useEffect(()=>{
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





