import React,{useState,useContext} from 'react'
import {NewGameMenu} from '../components/organisms/NewGameMenu'
import {MonopolySpinner} from  '../components/atoms/MonopolySpinner'
import {useHistory} from 'react-router-dom'
import {getGameModesList} from '../common/GameHelpers'
import {GameContext} from  '../context/GameContext'
import {ActionTypes} from '../common/constants'
import {gamesApi} from '../api/gamesApi'

export const NewGame = () => {
    
    const history = useHistory();

    const {gameState,gameDispatch} = useContext(GameContext);
    const [isLoading,setIsLoading] = useState(false)

    const [formInput,setFormInput] = useState(
        {
            name:"",
            gameMode:"",
            errors:null
        }
    )


    const newGameMenu = {
        gameInputText: {
            mode: "text",
            label: "Name",
            value:formInput.name,
            minLength:0,
            maxLength:40,
            placeholder:"Enter Name...",
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, name: e.target.value }
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
                const data = {
                    name:formInput.name,
                    gameMode:formInput.gameMode
                };
                gamesApi.post(data)
                    .then((success)=>{   
                        console.log(success.data);  
                        gameDispatch({type:ActionTypes.CreateResource,game:success.data});
                        history.push(`/${success.data.gamePassCode}/join-game`);
                    })
                    .catch((error)=>{
                        console.log(error.response.data);
                        setFormInput(prevState => {
                            return { ...prevState, errors:error.response.data }
                          });
                    })
                e.preventDefault();
            },
        },
        errors:formInput.errors
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
