import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css"
import {GameTitleMenu} from '../src/components/molecules/GameTitleMenu'

function App() {
  return (
    <div class="app-container">
      <GameTitleMenu  />
    </div>
  )
}

export default App




