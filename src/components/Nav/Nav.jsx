import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link, useHistory } from 'react-router-dom';

export const Nav = () => {
  const history = useHistory();

  const { email } = useStoreState(state => state.user);

  const { signOut, onAuthStateChanged } = useStoreActions(
    actions => actions.user
  );

  const handleSignOut = e => {
    e.preventDefault();

    signOut();

    history.push('/login');
  };

  useEffect(() => {
    onAuthStateChanged();
  }, [onAuthStateChanged]);

  return (
    <div className='row'>
      <nav className='col s12'>
        <div className='nav-wrapper'>
          <Link className='brand-logo' to='/'>
            <i className='material-icons'>business</i> DOKIMO
          </Link>
          <Link data-target='mobile-demo' className='sidenav-trigger' to='#'>
            <i className='material-icons'>menu</i>
          </Link>
          <ul className='right hide-on-med-and-down'>
            <li>
              <Link to='/bailleurs'>Bailleurs</Link>
            </li>
            <li>
              <Link to='/locataires'>Locataires</Link>
            </li>
            <li>
              <Link to='/lots'>Lots</Link>
            </li>

            {email && (
              <li style={{ display: 'flex' }}>
                <span className=''>{email}</span>
                <i
                  onClick={handleSignOut}
                  className='material-icons'
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                >
                  face
                </i>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/bailleurs'>Bailleurs</Link>
        </li>
        <li>
          <Link to='/locataires'>Locataires</Link>
        </li>
        <li>
          <Link to='/lots'>Lots</Link>
        </li>

        {email && (
          <li>
            <a href='!#' style={{ display: 'flex' }}>
              <span className=''>{email}</span>
              <i
                onClick={handleSignOut}
                className='material-icons'
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              >
                face
              </i>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
