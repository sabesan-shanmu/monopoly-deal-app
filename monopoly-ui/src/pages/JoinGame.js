import React,{useState} from 'react'
import {JoinGameTemplate} from '../components/templates/JoinGameTemplate'
import {useHistory} from 'react-router-dom'
import {getImageList} from '../common/ImageHelpers'

export const JoinGame = () =>{

    const history = useHistory();
    const [isRegisterScreenVisible,setIsRegisterScreenVisible] = useState(true);
    
    const [usernameText,setUsernameText] = useState(null)
    const [passwordText,setPasswordText] = useState(null)
    const [imageId,setImageId] = useState(null)


    const joinGameTemplate = {
        userNameInput: {
            mode: "text",
            label: "Username",
            value:usernameText,
            minLength:1,
            maxLength:20,
            placeholder:"Enter Username...",
            onChange:(e)=>{
                setUsernameText(e.target.value);
            }
        },
        passwordInput: {
            mode: "password",
            label: "Password",
            value:passwordText,
            minLength:8,
            maxLength:10,
            placeholder:"Enter Password...",
            onChange:(e)=>{
                setPasswordText(e.target.value);
            }
        },
        characterSelectionDropdown: {
            label: "Character",
            placeholder:"Select Character...",
            selected:imageId,
            onChange:(e)=>{
                setImageId(e.target.value);
            },
            options:getImageList()
        },
        cancelBtn:{
            onClick:()=>{history.push('/games-list')},
            label:"Cancel"
        },
        registerBtn:{
            label:"Register",
            type:"submit"
        },
        loginBtn:{
            label:"Login",
            type:"submit"
        },
        toggletoRegisterBtn:{
            onClick:()=>{setIsRegisterScreenVisible(!isRegisterScreenVisible)},
            label:"Register new Player"
        },
        toggleToLoginBtn:{
            onClick:()=>{setIsRegisterScreenVisible(!isRegisterScreenVisible)},
            label:"Login using existing Player"
        },
        isRegisterScreenVisible:isRegisterScreenVisible,
        imageId:imageId
    };

    return (
        <JoinGameTemplate
            {...joinGameTemplate}
        />
        
    )
}


