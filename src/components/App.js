import React, { useEffect } from 'react';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store/store';
import { Nav } from './Nav/Nav';
import { Home } from '../pages/Home/Home';

import { PrivateRoute } from './PrivateRoute/PrivateRoute';

import { Lessor } from './Lessor/Lessor';
import { AddLessor } from './AddLessor/AddLessor';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

function App() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <StoreProvider store={store}>
      <Router>
        <div className='App'>
          <Nav />
        </div>

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <PrivateRoute path='/lessors'>
            <Lessor />
          </PrivateRoute>

          <PrivateRoute path='/add-lessor'>
            <AddLessor />
          </PrivateRoute>
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
