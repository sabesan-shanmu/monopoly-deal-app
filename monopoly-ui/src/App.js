import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css"
import {Home} from './pages/Home'
import {NewGame} from './pages/NewGame'
import {SelectGame} from './pages/SelectGame'
import {Game} from './pages/Game'

function App() {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/new-game">
              <NewGame />
          </Route>
          <Route path="/select-game">
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




