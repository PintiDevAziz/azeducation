import React from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { AwesomeButton } from 'react-awesome-button';
const LogOutButton = () => {
  return (
    <AwesomeButton
      type="primary"
      size={'medium'}
      action={() => {
        signOut(auth);
      }}
    >
      Çıxış Et
    </AwesomeButton>
  );
};

export default LogOutButton;
