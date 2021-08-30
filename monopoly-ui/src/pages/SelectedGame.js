import React,{useContext,useState,useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import {JoinGame} from './JoinGame'
import {GameBoard} from './GameBoard'
import {MonopolySpinner} from '../components/atoms/MonopolySpinner'
import {GameContext} from '../context/GameContext'


export const SelectedGame = ({gamePassCode}) => {
    
    
    const {gameState, gameDispatch} = useContext(GameContext);

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


