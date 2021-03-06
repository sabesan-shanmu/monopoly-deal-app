import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css"
import {Home} from './pages/Home'
import {Game} from './pages/Game'

function App() {
  return (
    <div class="app-container">
      <Router>
        <Switch>
        <Route path="/:gamePassCode">
              <Game/>
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




