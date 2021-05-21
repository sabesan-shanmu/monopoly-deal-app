import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css"
import {Home} from './pages/Home'
import {NewGame} from './pages/NewGame'
import {JoinGame} from './pages/JoinGame'
import {GameBoard} from './pages/GameBoard'
import {SelectGame} from './pages/SelectGame'

function App() {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/:gamePassCode/game-board">
              <GameBoard/>
          </Route>
          <Route path="/:gamePassCode/join-game">
              <JoinGame/>
          </Route>
          <Route path="/new-game">
              <NewGame />
          </Route>
          <Route path="/games-list">
              <SelectGame />
          </Route>
          <Route path="/">
              <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App




