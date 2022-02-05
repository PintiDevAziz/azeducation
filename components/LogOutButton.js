import React from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
const LogOutButton = () => {
  return (
    <button
      onClick={() => {
        signOut(auth);
      }}
      className="flex h-10 w-32 items-center justify-center rounded bg-indigo-600 text-[17px] text-white transition-all hover:bg-indigo-500"
    >
      Çıxış Et
    </button>
  );
};

export default LogOutButton;
