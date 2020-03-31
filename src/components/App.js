import React, { useEffect } from 'react';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store/store';
import { Nav } from './Nav/Nav';
import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/SignUp/SignUp';

import { PrivateRoute } from './PrivateRoute/PrivateRoute';

import { Lessor } from './Lessor/Lessor';
import { AddLessor } from './AddLessor/AddLessor';

import { Batches } from '../pages/Batches/Batches';
import { AddBatch } from '../pages/AddBatch/AddBatch';

import { Tenants } from '../pages/Tenants/Tenants';

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
        <Nav />

        <div className='container'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>

            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/sign-up'>
              <SignUp />
            </Route>

            <PrivateRoute path='/bailleurs'>
              <Lessor />
            </PrivateRoute>
            <PrivateRoute path='/add-lessor'>
              <AddLessor />
            </PrivateRoute>

            <PrivateRoute path='/locataires'>
              <Tenants />
            </PrivateRoute>

            <PrivateRoute path='/lots'>
              <Batches />
            </PrivateRoute>
            <PrivateRoute path='/ajouter-lot'>
              <AddBatch />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
