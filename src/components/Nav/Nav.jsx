import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/lessors'>Bailleurs</Link>
        </li>
        <li>Lots</li>
        <li>Avis d'échéances</li>
        <li>Quittances</li>
        <li>Reçus partiel de loyer</li>
        <li>Révisions de loyer</li>
      </ul>
    </nav>
  );
};
