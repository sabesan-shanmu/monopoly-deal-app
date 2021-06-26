import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css"
import {GameContextProvider} from './context/GameContext'
import {PlayerContext, PlayerContextProvider} from './context/PlayerContext'
import {Home} from './pages/Home'
import {NewGame} from './pages/NewGame'
import {SelectGame} from './pages/SelectGame'
import {SelectedGame} from './pages/SelectedGame'

function App() {
 

  return (
    <div className="app-container">
      
       <Router>
        <Switch>
          <PlayerContextProvider>
            <Route exact path="/" component={Home} />
            <GameContextProvider>
                  <Route path={["/:gamePassCode/game-board", "/:gamePassCode/join-game"]}  render={({match}) => (
                        <SelectedGame gamePassCode={match.params.gamePassCode}/>
                  )}/>   
                  <Route exact path="/new-game" component={NewGame} />
                  <Route exact path="/games-list" component={SelectGame} />
            </GameContextProvider>
          </PlayerContextProvider>
        </Switch>
      </Router>
    </div>
  )
}

export default App




