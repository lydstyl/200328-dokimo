import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store/store';
import { Nav } from './Nav/Nav';
import { Lessor } from './Lessor/Lessor';
import { AddLessor } from './AddLessor/AddLessor';

import './App.css';

function App() {
  return (
    <StoreProvider store={store}>
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
    </StoreProvider>
  );
}

export default App;
