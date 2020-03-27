import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Nav } from './Nav/Nav';
import { Lessor } from './Lessor/Lessor';
import { AddLessor } from './AddLessor/AddLessor';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>Real Estate Documents Creator</h1>

        <Nav />
      </div>

      <Switch>
        <Route path='/lessors'>
          <Lessor />
        </Route>

        <Route path='/add-lessor'>
          <AddLessor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
