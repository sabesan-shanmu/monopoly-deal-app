import React,{useState} from 'react'
import {NewGameMenu} from '../components/organisms/NewGameMenu'
import {MonopolySpinner} from  '../components/atoms/MonopolySpinner'
import {useHistory} from 'react-router-dom'
import {createGame} from '../api/games'
import {getGameModesList} from '../common/GameHelpers'

export const NewGame = () => {
    
    const history = useHistory();

    const [isLoading,setIsLoading] = useState(false)
    const [formInput,setFormInput] = useState(
        {
            gameNameInput:"",
            gameMode:""
        }
    )


    const newGameMenu = {
        gameInputText: {
            mode: "text",
            label: "Game",
            value:formInput.gameNameInput,
            minLength:2,
            maxLength:30,
            placeholder:"Enter Name...",
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, gameNameInput: e.target.value }
                  });
            }
        },
        gameModeDropdown: {
            label: "Mode",
            placeholder:"Select Game Mode...",
            value:formInput.gameMode,
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, gameMode: parseInt(e.target.value) }
                  });
            },
            options:getGameModesList(),
            required:'required'
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
                createGame(formInput)
                    .then((resp)=>{     
                        console.log(resp.data);
                        history.push(`/${resp.data.gamePassCode}/join-game`);
                    })
                    .catch((error)=>{
                        console.error(error.response.data);
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
