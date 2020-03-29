import React, { useEffect } from 'react';

import { auth } from '../../firebase/firebase';

export const Login = () => {
  useEffect(() => {
    const email = 'ddddddd@gmail.com';
    const password = 'dddddddddddddd';

    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
    });
  }, []);

  return (
    <div>
      <h1>Login</h1>

      <form className='row'>
        <div className='input-field col s12 m6'>
          <input id='email' type='email' className='validate' />
          <label htmlFor='email'>Email</label>
        </div>

        <div className='input-field col s12 m6'>
          <input id='password' type='password' className='validate' />
          <label htmlFor='password'>Password</label>
        </div>
      </form>
    </div>
  );
};
