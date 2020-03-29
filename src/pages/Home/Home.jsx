import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>

      <Link to='/login'>
        <i className='material-icons'>business</i> Se connecter
      </Link>

      <Link to='/sign-up'>
        <i className='material-icons'>business</i> ou créer un compte
      </Link>
    </div>
  );
};
