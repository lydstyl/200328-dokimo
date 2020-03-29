import React, { useEffect } from 'react';

import { auth } from '../../firebase/firebase';

export const Home = () => {
  useEffect(() => {
    // const email = 'ddddddd@gmail.com';
    // const password = 'dddddddddddddd';
    // auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   console.log(errorCode);
    //   var errorMessage = error.message;
    //   alert(errorMessage);
    // });
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
