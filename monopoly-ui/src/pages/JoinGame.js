import React,{useState,useContext} from 'react'
import {JoinGameTemplate} from '../components/templates/JoinGameTemplate'
import {useHistory} from 'react-router-dom'
import {getImageList} from '../common/ImageHelpers'
import {MonopolySpinner} from  '../components/atoms/MonopolySpinner'
import {GameContext} from '../context/GameContext'
import {PlayerContext} from '../context/PlayerContext'
import {playersApi} from '../api/playersApi'
import {ResourceTypes} from '../common/constants'
import {getDecodedPlayer} from '../adapters/playerAdapter'

export const JoinGame = (props) =>{
    
    const {gameState, gameDispatch} = useContext(GameContext);
    const {playerState, playerDispatch} = useContext(PlayerContext);
    const history = useHistory();
    const [isRegisterScreenVisible,setIsRegisterScreenVisible] = useState(true);
    const [isLoading,setIsLoading] = useState(false)
    const [formInput,setFormInput] = useState(
        {
            playerName:"",
            playerPassCode:"",
            imageId:"",
            errors:null
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
            options:getImageList(gameState.game.players),
            required:'required'
        },
        cancelBtn:{
            onClick:()=>{history.push('/games-list')},
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
                playersApi.register(gameState.game.links.register,{playerName:formInput.playerName,playerPassCode:formInput.playerPassCode,imageId:formInput.imageId})
                    .then(function(success){
                        console.log(success.data);
                        const playerData = getDecodedPlayer(success.data);
                        playerDispatch({type:ResourceTypes.CreateResource,player:playerData});
                        history.push(`/${playerData.gamePassCode}/game-board`);
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                        setIsLoading(false);
                        setFormInput(prevState => {
                            return { ...prevState, errors:error.response.data}
                        });
                    })
                e.preventDefault();
            }
        },
        loginForm:{
            onSubmit:(e)=>{
                setIsLoading(true)
                playersApi.login(gameState.game.links.login,{playerName:formInput.playerName,playerPassCode:formInput.playerPassCode})
                    .then(function(success){
                        console.log(success.data);  
                        const playerData = getDecodedPlayer(success.data);
                        playerDispatch({type:ResourceTypes.CreateResource,player:playerData});
                        history.push(`/${playerData.gamePassCode}/game-board`);
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                        setIsLoading(false);
                        setFormInput(prevState => {
                            return { ...prevState, errors:error.response.data}
                        });
                    })
                e.preventDefault();
            }
        },
        errors:formInput.errors
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


