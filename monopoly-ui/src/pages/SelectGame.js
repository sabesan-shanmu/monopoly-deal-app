import React,{useState,useEffect} from 'react';
import {SelectGameMenu} from '../components/organisms/SelectGameMenu'
import {useHistory} from 'react-router-dom'
import {MonopolySpinner} from  '../components/atoms/MonopolySpinner'

export const SelectGame = () =>{

    const history = useHistory();
    const backOnSelect = ()=>{history.push('/')}
    const gameEntriesOnClick = (e)=>{history.push('/')}

    
    const [games,setGamesList] = useState([]);


    
    return (
        
    <React.Fragment>
        {!games &&
            <MonopolySpinner/>
        }
        {games &&
            <SelectGameMenu
                gameEntriesOnClick={gameEntriesOnClick}
                games={games}
                backOnSelect={backOnSelect}
            />
        }
    </React.Fragment> 
    )
}


