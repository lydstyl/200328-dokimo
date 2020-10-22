import React, { useEffect, useCallback } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'

export const Login = () => {
  const { batches } = useStoreState(state => state.batch)

  const history = useHistory()

  const {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
  } = useStoreActions(actions => actions.user)

  const redirectAfterLogin = useCallback(() => {
    if (batches.length) {
      history.push('/lots')
    }
  }, [batches, history])

  const handleLogin = e => {
    e.preventDefault()

    signInWithEmailAndPassword({
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
    })

    redirectAfterLogin()
  }

  const handleResetPassword = e => {
    e.preventDefault()

    const email = document.querySelector('[type=email]').value

    if (validateEmail(email)) {
      sendPasswordResetEmail(email)
    } else {
      M.toast({
        html: "Merci d'indiquer un e-mail valide dans l'entrée ci-dessus",
      })
    }

    function validateEmail(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }

  useEffect(() => {
    redirectAfterLogin()
  }, [redirectAfterLogin, batches])

  return (
    <form className='row'>
      <div className='input-field col s12'>
        <h1>Se connecter</h1>
      </div>

      <div className='input-field col s12 m6'>
        <input
          id='email'
          type='email'
          className='validate'
          autoComplete='username'
        />
        <label htmlFor='email'>Email</label>
      </div>

      <div className='input-field col s12 m6'>
        <input
          id='password'
          type='password'
          className='validate'
          autoComplete='current-password'
        />
        <label htmlFor='password'>Password</label>
      </div>

      <div className='input-field col s12'>
        <a
          onClick={handleLogin}
          href='!#'
          className='waves-effect waves-light btn'
        >
          <i className='material-icons left'>input</i>Se connecter
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
  )
}
