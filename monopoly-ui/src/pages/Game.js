import React from 'react'
import {SelectGame} from'./SelectGame'
import {GameBoard} from './GameBoard'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  
export const Game = () =>{

    return (
        <React.Fragment>
            <h1>Game</h1>
            <Router>
                <Switch>
                    <Route path="/:gamePassCode/join-game">
                        <SelectGame/>
                    </Route>
                    <Route path="/:gamePassCode/game-board">
                        <GameBoard/>
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
    )
}


