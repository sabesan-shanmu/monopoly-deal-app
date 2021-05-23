import React,{useState} from 'react';
import {SelectGameMenu} from '../components/organisms/SelectGameMenu'
import {useHistory} from 'react-router-dom'
import {GamesContextProvider} from '../context/GamesContext'
 
export const SelectGame = () =>{

    const history = useHistory();
    const backOnSelect = ()=>{history.push('/')}
    
   
    
    
    return (
        <GamesContextProvider>
            <SelectGameMenu backOnSelect={backOnSelect}  />
        </GamesContextProvider>
    )
}


