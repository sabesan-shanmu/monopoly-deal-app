import React,{useState} from 'react';
import {SelectGameMenu} from '../components/organisms/SelectGameMenu'
import {useHistory} from 'react-router-dom'
import {GamesListContextProvider} from '../context/GamesListContext'
 
export const SelectGame = () =>{

    const history = useHistory();
    const backBtn = {
        onClick:()=>{history.push('/')},
        label:"Go Back"
    }
   
    console.log("blah");
    
    return (
        <GamesListContextProvider>
            <SelectGameMenu backBtn={backBtn}  />
        </GamesListContextProvider>
    )
}


