import React, { useRef } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

import { auth } from '../../firebase/firebase';

export const SignUp = () => {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleSignUp = e => {
    e.preventDefault();

    M.toast({ html: 'createUserWithEmailAndPassword' });

    auth
      .createUserWithEmailAndPassword(
        emailInput.current.value,
        passwordInput.current.value
      )
      .catch(function(error) {
        M.toast({ html: error.message });
      });
  };

  return (
    <form className='row'>
      <div className='input-field col s12'>
        <h1>SignUp</h1>
      </div>

      <div className='input-field col s12 m6'>
        <input ref={emailInput} id='email' type='email' className='validate' />
        <label htmlFor='email'>Email</label>
      </div>

      <div className='input-field col s12 m6'>
        <input
          ref={passwordInput}
          id='password'
          type='password'
          className='validate'
        />
        <label htmlFor='password'>Password</label>
      </div>

      <div className='input-field col s12'>
        <a
          onClick={handleSignUp}
          href='!#'
          className='waves-effect waves-light btn'
        >
          <i className='material-icons left'>cloud</i>button
        </a>
      </div>
    </form>
  );
};
