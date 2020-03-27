import React from 'react';
import { Link } from 'react-router-dom';

export const Lessor = () => {
  return (
    <div>
      <h1>Bailleurs</h1>
      <Link to='/add-lessor'>Ajouter un bailleur</Link>
    </div>
  );
};
