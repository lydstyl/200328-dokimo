import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory, Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

export const Login = () => {
  const { user } = useStoreState((state) => state.user);
  const { lessors } = useStoreState((state) => state.lessor);

  const history = useHistory();

  const {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
  } = useStoreActions((actions) => actions.user);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword({
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
    });

    if (user) {
      if (lessors.length) {
        history.push('/lots'); // TODO fix not working
      } else {
        history.push('/bailleurs');
      }
    }
  };

  function validateEmail(email) {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleResetPassword = (e) => {
    e.preventDefault();

    const email = document.querySelector('[type=email]').value;

    if (validateEmail(email)) {
      sendPasswordResetEmail(email);
    } else {
      M.toast({
        html: "Merci d'indiquer un e-mail valide dans l'entrée ci-dessus",
      });
    }
  };

  return (
    <form className='row'>
      <div className='input-field col s12'>
        <h1>Se connecter</h1>
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
          <i className='material-icons left'>cloud</i>Se connecter
        </a>
      </div>

      <div className='col s12'>
        <p>
          <Link to='/sign-up'>ou créer un compte</Link>
        </p>
        <p>
          <a onClick={handleResetPassword} href='!#'>
            ou m'envoyer un e-mail de réinitialisation de mot de passe
          </a>
        </p>
      </div>
    </form>
  );
};
