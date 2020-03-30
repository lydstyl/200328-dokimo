import React, { useRef } from 'react';

import { useStoreActions } from 'easy-peasy';

import { useHistory } from 'react-router-dom';

export const SignUp = () => {
  const history = useHistory();

  const createUserWithEmailAndPassword = useStoreActions(
    actions => actions.user.createUserWithEmailAndPassword
  );

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleSignUp = e => {
    e.preventDefault();

    createUserWithEmailAndPassword({
      email: emailInput.current.value,
      password: passwordInput.current.value
    });

    history.push('/lessors');
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
