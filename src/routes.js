import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Homepage from './components/Homepage'

const App = () => (
  <Router>
    <Route path="/">
      <Homepage />
    </Route>
  </Router>
)

export default App