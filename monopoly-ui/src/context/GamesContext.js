import React,{useState,useEffect} from 'react'
import {getGames} from '../api/games';

export const GamesContext = React.createContext();



export const GamesContextProvider = ({children}) => {

    const [games,setGamesList] = useState(null)


    useEffect( ()=>{
        getGames().then(function(res){
            console.log("Game List Load Success!");
            setGamesList(res.data);
        }).catch(function(err){
            console.log("Game List Load Error!");
            setGamesList([]);
        })
    },[])

    return (
        <GamesContext.Provider 
            value={{
                games:games
            }}>
            {children}
        </GamesContext.Provider>
    )
} 





