import React, { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { AwesomeButton } from 'react-awesome-button';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Index = () => {
  //! Router
  const router = useRouter();
  //!Google provider
  const googleProvider = new GoogleAuthProvider();
  const [isEye, setIsEye] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, userLoading, userError] = useAuthState(auth);
  const [error, setErrror] = useState('');
  //normal login
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      setErrror(err.code)
    );
  };
  const loginWithGoogle = () => {
    if (!error) {
      signInWithPopup(auth, googleProvider);
    } else {
      setErrror(true);
    }
  };
  //! Push to home page

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);
  return (
    <div className="flex h-screen items-center justify-center  ">
      <div className=" glassorism  container  flex h-[35rem] w-[30rem] flex-col items-center p-10">
        <h1 className="mb-4 mr-auto text-4xl font-semibold tracking-wider underline decoration-sky-500">
          Daxil Ol
        </h1>
        <label className=" group  relative my-4 h-12  w-full">
          <div className="absolute -top-3 left-2 translate-y-3 bg-transparent bg-white text-gray-500 opacity-0 transition-all group-focus-within:translate-y-0 group-focus-within:opacity-100">
            Emailiniz daxil edin
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Emailiniz daxil edin"
            className=" h-full w-full rounded border-2  border-gray-400 px-4 outline-none transition-all focus-within:border-sky-500 group-focus-within:placeholder:text-white"
          />
          <BiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 group-focus-within:text-sky-700" />
        </label>
        <label className="group  relative my-4  h-12 w-full">
          <div className="absolute -top-3 left-2 translate-y-3 bg-transparent bg-white text-gray-500 opacity-0 transition-all group-focus-within:translate-y-0 group-focus-within:opacity-100">
            Şifrənizi daxil edin
          </div>
          <input
            type={isEye ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Şifrənizi daxil edin"
            className=" h-full w-full rounded border-2 border-gray-400 px-4 outline-none transition-all focus-within:border-sky-500 group-focus-within:placeholder:text-white"
          />
          <div
            onClick={() => {
              setIsEye(!isEye);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 transition-all group-focus-within:text-sky-700"
          >
            {isEye ? (
              <AiOutlineEyeInvisible className=" transition-all" />
            ) : (
              <AiOutlineEye className=" transition-all" />
            )}
          </div>
        </label>
        <div className={`${error ? 'block' : 'hidden'} text-red-500`}>
          {error && error.replace('/auth', '')}
        </div>
        <AwesomeButton
          type="primary"
          size={'medium'}
          ripple={true}
          action={() => {
            login();
          }}
        >
          Giris Et
        </AwesomeButton>
        <div className="relative mt-10 mb-10 h-[1px] w-full bg-gray-400">
          <div className="absolute left-1/2 -top-3 flex w-16 -translate-x-1/2 items-center justify-center rounded border border-sky-400 bg-white text-gray-700">
            Və Ya
          </div>
        </div>
        <AwesomeButton
          type="secondary"
          size={'lg'}
          ripple={true}
          action={() => {
            loginWithGoogle();
          }}
        >
          <FcGoogle className="mr-2" />
          <span>Google ilə daxil ol</span>
        </AwesomeButton>
        <Link href={'/login/signup'}>
          <a className="mt-auto text-gray-500 hover:text-sky-500 hover:underline">
            Hələ də Hesabın yoxdur ?
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Index;
