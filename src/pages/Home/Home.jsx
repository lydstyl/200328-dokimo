import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase';

export const Home = () => {
  const handleSignOut = e => {
    e.preventDefault();

    auth.signOut();
  };

  return (
    <div>
      <h1>Home</h1>

      <Link to='/login'>
        <i className='material-icons'>business</i> Se connecter
      </Link>

      <Link to='/sign-up'>
        <i className='material-icons'>business</i> ou créer un compte
      </Link>

      <a onClick={handleSignOut} href='#!' class='waves-effect waves-light btn'>
        signOut
      </a>
    </div>
  );
};
