import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

export const Home = () => {
  const signOut = useStoreActions(actions => actions.user.signOut);

  const handleSignOut = e => {
    e.preventDefault();

    signOut();
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

      <a
        onClick={handleSignOut}
        href='#!'
        className='waves-effect waves-light btn'
      >
        signOut
      </a>
    </div>
  );
};
