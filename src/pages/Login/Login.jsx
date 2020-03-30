import React from 'react';

import { useStoreActions } from 'easy-peasy';

import { useHistory, Link } from 'react-router-dom';

export const Login = () => {
  const history = useHistory();

  const signInWithEmailAndPassword = useStoreActions(
    actions => actions.user.signInWithEmailAndPassword
  );

  const handleLogin = e => {
    e.preventDefault();

    signInWithEmailAndPassword({
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value
    });

    history.push('/lessors');
  };

  return (
    <form className='row'>
      <div className='input-field col s12'>
        <h1>Login</h1>
      </div>

      <div className='input-field col s12 m6'>
        <input id='email' type='email' className='validate' />
        <label htmlFor='email'>Email</label>
      </div>

      <div className='input-field col s12 m6'>
        <input id='password' type='password' className='validate' />
        <label htmlFor='password'>Password</label>
      </div>

      <div className='input-field col s12'>
        <a
          onClick={handleLogin}
          href='!#'
          className='waves-effect waves-light btn'
        >
          <i className='material-icons left'>cloud</i>button
        </a>
      </div>

      <p>
        <Link to='/sign-up'>ou créer un compte</Link>
      </p>
    </form>
  );
};
