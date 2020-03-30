import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  // useStoreState,
  useStoreActions
} from 'easy-peasy';

export const Nav = () => {
  const onAuthStateChanged = useStoreActions(
    actions => actions.user.onAuthStateChanged
  );

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
              <Link to='/lessors'>Bailleurs</Link>
            </li>
            <li>
              <Link to='/'>Lots</Link>
            </li>
            <li>
              <Link to='/'>Avis d'échéance</Link>
            </li>
            <li>
              <Link to='/'>Quittances</Link>
            </li>
            <li>
              <Link to='/'>Reçu partiel de loyer</Link>
            </li>
            <li>
              <Link to='/'>Révisions de loyer</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/lessors'>Bailleurs</Link>
        </li>
        <li>
          <Link to='/'>Lots</Link>
        </li>
        <li>
          <Link to='/'>Avis d'échéance</Link>
        </li>
        <li>
          <Link to='/'>Quittances</Link>
        </li>
        <li>
          <Link to='/'>Reçu partiel de loyer</Link>
        </li>
        <li>
          <Link to='/'>Révisions de loyer</Link>
        </li>
      </ul>
    </div>
  );
};
