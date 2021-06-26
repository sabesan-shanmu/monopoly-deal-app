import React,{useState,useContext} from 'react'
import {JoinGameTemplate} from '../components/templates/JoinGameTemplate'
import {useHistory} from 'react-router-dom'
import {getImageList} from '../common/ImageHelpers'
import {MonopolySpinner} from  '../components/atoms/MonopolySpinner'
import {GameContext} from '../context/GameContext'
import {playersApi} from '../api/playersApi'

export const JoinGame = (props) =>{
    
    const {gameState, gameDispatch} = useContext(GameContext);
    const history = useHistory();
    const [isRegisterScreenVisible,setIsRegisterScreenVisible] = useState(true);
    const [isLoading,setIsLoading] = useState(false)
    const [formInput,setFormInput] = useState(
        {
            playerName:"",
            playerPassCode:"",
            imageId:""
        }
    )


    const joinGameTemplate = {
        userNameInputText: {
            mode: "text",
            label: "Username",
            value:formInput.playerName,
            minLength:3,
            maxLength:20,
            placeholder:"Enter Username...",
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, playerName: e.target.value }
                  });
            }
        },
        passwordInputText: {
            mode: "password",
            label: "Password",
            value:formInput.playerPassCode,
            minLength:3,
            maxLength:10,
            placeholder:"Enter Password...",
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, playerPassCode: e.target.value }
                  });
            }
        },
        characterSelectionDropdown: {
            label: "Character",
            placeholder:"Select Character...",
            value:formInput.imageId,
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, imageId: e.target.value }
                  });
            },
            options:getImageList(),
            required:'required'
        },
        cancelBtn:{
            onClick:()=>{history.push('/')},
            label:"Cancel"
        },
        registerBtn:{
            label:"Sign Up",
            type:"submit"
        },
        loginBtn:{
            label:"Sign In",
            type:"submit"
        },
        toggletoRegisterBtn:{
            onClick:()=>{
                setIsRegisterScreenVisible(!isRegisterScreenVisible)
            },
            label:"Sign Up new Player"
        },
        toggleToLoginBtn:{
            onClick:()=>{
                setIsRegisterScreenVisible(!isRegisterScreenVisible)

            },
            label:"Sign In as existing Player"
        },
        isRegisterScreenVisible:isRegisterScreenVisible,
        imageId:formInput.imageId,
        registerForm:{
            onSubmit:(e)=>{
                setIsLoading(true)
                playersApi.register(gameState.game.links.register,formInput)
                    .then(function(success){
                        console.log(success.data);  
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                    })
                e.preventDefault();
            }
        },
        loginForm:{
            onSubmit:(e)=>{
                setIsLoading(true)
                playersApi.register(gameState.game.links.register,formInput)
                    .then(function(success){
                        console.log(success.data);  
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                    })
                e.preventDefault();
            }
        }
    };


    return (
        <React.Fragment>
        {isLoading &&
            <MonopolySpinner/>
        }
        {!isLoading &&
            <JoinGameTemplate {...joinGameTemplate} />
        }
        </React.Fragment>    
        
    )
}


