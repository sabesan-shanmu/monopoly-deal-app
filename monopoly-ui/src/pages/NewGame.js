import React,{useState} from 'react'
import {NewGameMenu} from '../components/organisms/NewGameMenu'
import {MonopolySpinner} from  '../components/atoms/MonopolySpinner'
import {useHistory} from 'react-router-dom'
import {createGame} from '../api/games'

export const NewGame = () => {
    
    const history = useHistory();
    const [gameInput,setGameInput] = useState(null)
    const [isLoading,setIsLoading] = useState(false)

    const newGameMenu = {
        gameInputText: {
            mode: "text",
            label: "Game",
            value:gameInput,
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
                setIsLoading(true)
                createGame(gameInput)
                    .then((resp)=>{     
                        console.log(resp.data);
                        history.push(`/${resp.data.gamePassCode}/join-game`);
                    })
                    .catch((error)=>{
                        console.error(error)
                        setIsLoading(false)
                    })

                e.preventDefault();
            },
        }
    };
    

    return (
        <React.Fragment>
            {isLoading &&
                <MonopolySpinner/>
            }
            {!isLoading &&
                <NewGameMenu  {...newGameMenu} />
            }
        </React.Fragment>       
    )
};
