import React from 'react';
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
import { BatchDetail } from '../pages/BatchDetail/BatchDetail';
import { DueNotice } from '../pages/DueNotice/DueNotice';
import { PaymentReceipt } from '../pages/PaymentReceipt/PaymentReceipt';
import { Terms } from '../pages/Terms/Terms';
import { Tenants } from '../pages/Tenants/Tenants';
import { PaymentDocument } from '../pages/PaymentDocument/PaymentDocument';

import 'materialize-css/dist/css/materialize.min.css';

import './App.css';

function App() {
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

            <PrivateRoute path='/terms'>
              <Terms />
            </PrivateRoute>

            <PrivateRoute path='/lots'>
              <Batches />
            </PrivateRoute>
            <PrivateRoute path='/ajouter-lot'>
              <AddBatch />
            </PrivateRoute>

            <PrivateRoute path='/lot/:id/avis-echeance'>
              <DueNotice />
            </PrivateRoute>

            <PrivateRoute path='/lot/:id/reception-paiement'>
              <PaymentReceipt />
            </PrivateRoute>

            <PrivateRoute path='/lot/:bid/recu/:id'>
              <PaymentDocument />
            </PrivateRoute>
            <PrivateRoute path='/lot/:id'>
              <BatchDetail />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
