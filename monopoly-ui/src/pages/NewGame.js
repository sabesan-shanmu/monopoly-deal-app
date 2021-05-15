import React from 'react'
import {NewGameMenu} from '../components/organisms/NewGameMenu'
import {useHistory} from 'react-router-dom'

export const NewGame = () => {
    
    const history = useHistory();

    const newGameMenu = {
        cancelOnClick:()=>{history.push('/')},
        createOnClick:null
    };

    return (
        <NewGameMenu  {...newGameMenu} />
    )
};
