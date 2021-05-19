import React from 'react'
import {GameTitleMenu} from '../components/organisms/GameTitleMenu'
import {useHistory} from 'react-router-dom'

export const Home = () =>{
    
    const history = useHistory();

    const gameTitleMenu = {
        newGameOnClick:()=>{history.push('/new-game')},
        selectGameOnClick: ()=>{history.push('/games-list')}
    }

    return (
        
            <GameTitleMenu {...gameTitleMenu}/>
    )
}

