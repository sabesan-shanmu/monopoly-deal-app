import React from 'react'
import {SelectGameMenu} from '../components/organisms/SelectGameMenu'
import {useHistory} from 'react-router-dom'

export const SelectGame = () =>{

    const history = useHistory();

    const selectGameMenu = {
        games:[],
        gameEntriesOnClick:null,
        backOnSelect:()=>{history.push('/')}
    }

    return (
       <SelectGameMenu {...selectGameMenu} />
    )
}


