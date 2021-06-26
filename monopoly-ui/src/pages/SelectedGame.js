import React,{useContext,useState,useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import {ActionTypes} from '../common/constants' 
import {JoinGame} from './JoinGame'
import {GameBoard} from './GameBoard'
import {MonopolySpinner} from '../components/atoms/MonopolySpinner'
import {gamesApi} from '../api/gamesApi'
import {GameContext} from '../context/GameContext'

export const SelectedGame = ({gamePassCode}) => {
    

    const {gameState, gameDispatch} = useContext(GameContext);
    
    useEffect(()=>{
        console.log(gamePassCode);
        if(!gameState || gameState?.game?.gamePassCode != gamePassCode){
            gamesApi.get(gamePassCode).then((success)=>{
                console.log(success.data);
                gameDispatch({type:ActionTypes.CreateResource,game:success.data});
            }).catch((error)=>{
                console.log(error.response.data);
            })
        }

    },[])

    return (
        <React.Fragment>
            {!gameState.game &&
                <MonopolySpinner/>
            }
            {gameState.game &&   
                <Switch>
                    <Route exact path="/:gamePassCode/game-board"  component={GameBoard}/>
                    <Route exact path="/:gamePassCode/join-game" component={JoinGame} />
                </Switch>   
            }
        </React.Fragment>    
    )
}


