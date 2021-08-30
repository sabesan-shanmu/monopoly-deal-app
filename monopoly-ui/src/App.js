import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css"
import {GameContextProvider} from './context/GameContext'
import {PlayerContextProvider} from './context/PlayerContext'
import {Home} from './pages/Home'
import {NewGame} from './pages/NewGame'
import {SelectGame} from './pages/SelectGame'
import {SelectedGame} from './pages/SelectedGame'
import {SocketContextProvider} from './context/SocketContext'

function App() {
 

  return (
    <div className="app-container">
        <SocketContextProvider>
          
            <Router>
              <Switch>
                <PlayerContextProvider>
                  <Route exact path="/" component={Home} />
                  
                        <Route path={["/:gamePassCode/game-board", "/:gamePassCode/join-game"]}  render={({match}) => (
                          <GameContextProvider>
                              <SelectedGame gamePassCode={match.params.gamePassCode}/>
                          </GameContextProvider>
                        )}/>   
                        <Route exact path="/new-game" component={NewGame} />
                        <Route exact path="/games-list" component={SelectGame} />  
                </PlayerContextProvider>
              </Switch>
            </Router>
        </SocketContextProvider>
    </div>
  )
}

export default App




