import React from 'react';
import { Link } from 'react-router-dom';
export const Nav = () => {
  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='#!' className='brand-logo'>
            Dokimo
          </a>
          <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/lessors'>Bailleurs</Link>
            </li>
            {/* <li>
              <i className='material-icons'>face</i>
            </li>
            <li>Lots</li>
            <li>Avis d'échéances</li>
            <li>Quittances</li>
            <li>Reçus partiel de loyer</li>
            <li>Révisions de loyer</li> */}
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
    </>
  );
};
