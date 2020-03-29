import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  // useStoreState,
  useStoreActions
} from 'easy-peasy';

import { auth } from '../../firebase/firebase';

export const Nav = () => {
  // const { isAuthenticated } = useStoreState(state => state.user);

  const { setIsAuthenticated } = useStoreActions(actions => actions.user);

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        // var providerData = user.providerData;
        setIsAuthenticated(true);
        alert(uid);
        // ...
      } else {
        // User is signed out.
        // ...
        setIsAuthenticated(false);
        alert('no user');
      }
    });
  }, [setIsAuthenticated]);

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <Link className='brand-logo' to='/'>
            <i className='material-icons'>business</i> DOKIMO
          </Link>
          <Link data-target='mobile-demo' className='sidenav-trigger' to='#'>
            <i className='material-icons'>menu</i>
          </Link>
          <ul className='right hide-on-med-and-down'>
            <li>
              <Link to='/lessors'>Bailleurs</Link>
            </li>
            <li>
              <Link to='/'>Lots</Link>
            </li>
            <li>
              <Link to='/'>Avis d'échéance</Link>
            </li>
            <li>
              <Link to='/'>Quittances</Link>
            </li>
            <li>
              <Link to='/'>Reçu partiel de loyer</Link>
            </li>
            <li>
              <Link to='/'>Révisions de loyer</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/lessors'>Bailleurs</Link>
        </li>
        <li>
          <Link to='/'>Lots</Link>
        </li>
        <li>
          <Link to='/'>Avis d'échéance</Link>
        </li>
        <li>
          <Link to='/'>Quittances</Link>
        </li>
        <li>
          <Link to='/'>Reçu partiel de loyer</Link>
        </li>
        <li>
          <Link to='/'>Révisions de loyer</Link>
        </li>
      </ul>
    </>
  );
};
