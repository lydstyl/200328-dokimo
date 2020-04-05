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
    utils: { inputDateExtractor, enDateToFr, prefix0 },
  } = useStoreState((state) => state.batch);

  const { firestoreAddTerm, firestoreDelTerm } = useStoreActions(
    (actions) => actions.batch
  );

  const createTerm = (inputTermFrom) => {
    const termFrom = inputDateExtractor(inputTermFrom);
    let tmp = termFrom.string.split('-');
    tmp[2] = '01';

    termFrom.string = tmp.join('-');
    termFrom.day = 1;

    const date = new Date(inputTermFrom);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = new Date(year, month, 0).getDate();

    const termTo = {
      string: `${year}-${prefix0(month)}-${day}`,
      year,
      month,
      day,
    };

    setLastDayOfMonth(termTo.string);

    const term = {
      termFrom,
      termTo,
    };

    return term;
  };

  const handleTermFromChange = (e) => {
    const value = e.target.value;
    setInputTermFrom(value);

    const term = createTerm(e.target.value);

    term.uid = uid;

    term.rentReceiptDate = { ...term.termFrom };
    term.rentReceiptDate.day = 10;
    term.rentReceiptDate.string = term.rentReceiptDate.string.split('-');
    term.rentReceiptDate.string[2] = '10';
    term.rentReceiptDate.string = term.rentReceiptDate.string.join('-');

    term.termFrom.stringFr = enDateToFr(term.termFrom.string);
    term.termTo.stringFr = enDateToFr(term.termTo.string);
    term.rentReceiptDate.stringFr = enDateToFr(term.rentReceiptDate.string);

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
              Du {term.termFrom.stringFr} au {term.termTo.stringFr}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
