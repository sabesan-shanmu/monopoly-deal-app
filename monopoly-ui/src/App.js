import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css"
import {GameContextProvider} from './context/GameContext'
import {Home} from './pages/Home'
import {NewGame} from './pages/NewGame'
import {JoinGame} from './pages/JoinGame'
import {GameBoard} from './pages/GameBoard'
import {SelectGame} from './pages/SelectGame'

function App() {
  //session call

  return (
    <div className="app-container">
       <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <GameContextProvider>
                <Route exact path="/:gamePassCode/game-board"  component={GameBoard}/>
                <Route exact path="/:gamePassCode/join-game" component={JoinGame} />
               
                  <Route exact path="/new-game" component={NewGame} />
                  <Route exact path="/games-list" component={SelectGame} />
                
          </GameContextProvider>
          <Route path="*" render={()=>{
              //TODO:check if user is authenticated
              return <Redirect path="/" />
          }} />
        </Switch>
      </Router>
    </div>
  )
}

export default App




