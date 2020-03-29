import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useStoreState(state => state.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
