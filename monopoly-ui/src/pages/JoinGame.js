import React,{useState} from 'react'
import {JoinGameTemplate} from '../components/templates/JoinGameTemplate'
import {useHistory} from 'react-router-dom'
import {getImageList} from '../common/ImageHelpers'
import {MonopolySpinner} from  '../components/atoms/MonopolySpinner'

export const JoinGame = () =>{

    const history = useHistory();
    const [isRegisterScreenVisible,setIsRegisterScreenVisible] = useState(true);
    const [isLoading,setIsLoading] = useState(false)
    const [formInput,setFormInput] = useState(
        {
            userNameInput:null,
            passwordInput:null,
            imageId:null
        }
    )


    const joinGameTemplate = {
        userNameInputText: {
            mode: "text",
            label: "Username",
            value:formInput.userNameInput,
            minLength:1,
            maxLength:20,
            placeholder:"Enter Username...",
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, userNameInput: e.target.value }
                  });
            }
        },
        passwordInputText: {
            mode: "password",
            label: "Password",
            value:formInput.passwordInput,
            minLength:8,
            maxLength:10,
            placeholder:"Enter Password...",
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, passwordInput: e.target.value }
                  });
            }
        },
        characterSelectionDropdown: {
            label: "Character",
            placeholder:"Select Character...",
            selected:formInput.imageId,
            onChange:(e)=>{
                setFormInput(prevState => {
                    return { ...prevState, imageId: e.target.value }
                  });
            },
            options:getImageList()
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
            onClick:()=>{setIsRegisterScreenVisible(!isRegisterScreenVisible)},
            label:"Sign Up new Player"
        },
        toggleToLoginBtn:{
            onClick:()=>{setIsRegisterScreenVisible(!isRegisterScreenVisible)},
            label:"Sign In as existing Player"
        },
        isRegisterScreenVisible:isRegisterScreenVisible,
        imageId:formInput.imageId,
        registerForm:{
            onSubmit:(e)=>{
                setIsLoading(true)
                e.preventDefault();
            }
        },
        loginForm:{
            onSubmit:(e)=>{
                setIsLoading(true)
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


