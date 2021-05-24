import React,{useState} from 'react';
import {SelectGameMenu} from '../components/organisms/SelectGameMenu'
import {useHistory} from 'react-router-dom'
import {GamesContextProvider} from '../context/GamesContext'
 
export const SelectGame = () =>{

    const history = useHistory();
    const backBtn = {
        onClick:()=>{history.push('/')},
        label:"Go Back"
    }
   
    
    
    return (
        <GamesContextProvider>
            <SelectGameMenu backBtn={backBtn}  />
        </GamesContextProvider>
    )
}


