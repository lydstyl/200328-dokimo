import React from 'react';

import { auth } from '../../firebase/firebase';
import M from 'materialize-css/dist/js/materialize.min.js';

export const Login = () => {
  const handleLogin = e => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        document.querySelector('#email').value,
        document.querySelector('#password').value
      )
      .catch(function(error) {
        M.toast({ html: error.message });
      });
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
    </form>
  );
};
