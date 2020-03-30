import React, { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

export const Home = () => {
  const history = useHistory();

  const { email } = useStoreState(state => state.user);

  useEffect(() => {
    if (!email) {
      history.push('/login');
    }
  }, [history, email]);

  return (
    <div className='row'>
      <div className='col s12'>
        <h1>Home</h1>

        {email && <p>Bonjour {email}</p>}
      </div>
    </div>
  );
};
