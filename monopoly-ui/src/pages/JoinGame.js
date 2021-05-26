import React from 'react'
import {JoinGameTemplate} from '../components/templates/JoinGameTemplate'
import {useHistory} from 'react-router-dom'

export const JoinGame = () =>{

    const history = useHistory();

    const joinGameTemplate = {
        userNameInput: {
            mode: "text",
            label: "UserName",
            minLength:1,
            maxLength:20,
            placeholder:"Enter User Name...",
            onChange:(e)=>{
            }
        },
        passwordInput: {
            mode: "password",
            label: "Password",
            minLength:8,
            maxLength:10,
            placeholder:"Enter password...",
            onChange:(e)=>{
            }
        },
        cancelBtn:{
            onClick:()=>{history.push('/games-list')},
            label:"Cancel"
        },
        loginBtn:{
            label:"Login",
            type:"submit"
        }
    };

    return (
        <JoinGameTemplate
            {...joinGameTemplate}
        />
        
    )
}


