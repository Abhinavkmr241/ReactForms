import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Work from './components/Work'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Profile} />
          <Route path="/work" component={Work} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
