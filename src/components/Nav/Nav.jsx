import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link, useHistory } from 'react-router-dom';

export const Nav = () => {
  const history = useHistory();

  const { user, email } = useStoreState(state => state.user);

  const { signOut, onAuthStateChanged } = useStoreActions(
    actions => actions.user
  );

  const { firestoreGetLessors } = useStoreActions(actions => actions.lessor);
  const { firestoreGetTenants } = useStoreActions(actions => actions.tenant);
  const { firestoreGetBatches } = useStoreActions(actions => actions.batch);

  const handleSignOut = e => {
    e.preventDefault();

    signOut();

    history.push('/login');
  };

  useEffect(() => {
    onAuthStateChanged();
  }, [onAuthStateChanged]);

  useEffect(() => {
    if (user) {
      if (user.uid) {
        firestoreGetLessors(user.uid);
        firestoreGetTenants(user.uid);
        firestoreGetBatches(user.uid);
      }
    }
  }, [user, firestoreGetLessors, firestoreGetTenants, firestoreGetBatches]);

  return (
    <div className='row no-print'>
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
            {/* <li>
              <Link to='/paiement'>Paiement</Link>
            </li> */}
            <li>
              <Link to='/revision-loyer'>Révision de loyer</Link>
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
        {/* <li>
          <Link to='/paiement'>Paiement</Link>
        </li> */}
        <li>
          <Link to='/revision-loyer'>Révision de loyer</Link>
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
