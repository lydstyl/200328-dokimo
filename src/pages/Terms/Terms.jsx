import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

export const Terms = () => {
  const [inputTermFrom, setInputTermFrom] = useState('');
  const [lastDayOfMonth, setLastDayOfMonth] = useState('');
  const [term, setTerm] = useState(null);

  const { uid } = useStoreState((state) => state.user);

  const {
    // loading,
    terms,
    utils: { inputDateExtractor, prefix0 },
  } = useStoreState((state) => state.batch);

  const { firestoreAddTerm, firestoreDelTerm } = useStoreActions(
    (actions) => actions.batch
  );

  const createTerm = (inputTermFrom) => {
    const termFrom = inputDateExtractor(inputTermFrom);
    let tmp = termFrom.string.split('-');
    tmp[2] = '01';

    termFrom.string = tmp.join('-');

    const date = new Date(inputTermFrom);

    const year = date.getFullYear();
    const month = prefix0(date.getMonth() + 1);
    const day = prefix0(new Date(year, month, 0).getDate());
    const termTo = {
      string: `${year}-${month}-${day}`,
      year,
      month,
      day,
    };

    setLastDayOfMonth(termTo.string);

    const term = {
      termFrom,
      termTo,
    };

    console.log(term);

    return term;
  };

  const handleTermFromChange = (e) => {
    const value = e.target.value;
    setInputTermFrom(value);

    const term = createTerm(e.target.value);

    term.uid = uid;
    setTerm(term);
  };

  const handleAddTerm = (e) => {
    e.preventDefault();

    firestoreAddTerm(term);
  };

  return (
    <div>
      <h1 className='row'>Terms</h1>

      <form className='row'>
        <div className='input-field col s6'>
          <input
            onChange={handleTermFromChange}
            name='termFrom'
            id='termFrom'
            type='date'
            className='validate'
          />
          <label htmlFor='termFrom'>Term du</label>
        </div>

        <p className='col'>
          du {inputTermFrom} au {lastDayOfMonth}
        </p>

        <div className='col'>
          <button onClick={(e) => handleAddTerm(e)}>+</button>
        </div>
      </form>

      <ul className='terms'>
        {terms.map((term) => (
          <li key={term.id}>
            <p>
              <button onClick={() => firestoreDelTerm(term.id)}>X</button>
              Du {term.termFrom.string} au {term.termTo.string}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
