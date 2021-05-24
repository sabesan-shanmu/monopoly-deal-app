import React,{useState} from 'react'
import {NewGameMenu} from '../components/organisms/NewGameMenu'
import {useHistory} from 'react-router-dom'

export const NewGame = () => {
    
    const history = useHistory();
    const [gameInput,setGameInput] = useState(null)

    const newGameMenu = {
        gameInputText: {
            mode: "text",
            label: "Game",
            minLength:2,
            maxLength:30,
            placeholder:"Enter Name...",
            onChange:(e)=>{
                setGameInput(e.target.value);
            }
        },
        cancelBtn:{
            onClick:()=>{history.push('/')},
            label:"Cancel"
        },
        createBtn:{
            label:"Create",
            type:"submit"
        },
        gameForm:{
            onSubmit:(e)=>{
                
                
                e.preventDefault();
            },
        }
    };
    

    return (
        <NewGameMenu  {...newGameMenu} />
    )
};
