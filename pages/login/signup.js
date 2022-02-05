import React, { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
const Index = () => {
  //! Router
  const router = useRouter();
  const [isEye, setIsEye] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrror] = useState('');
  //normal login

  const register = () => {
    if (!error) {
      createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        setErrror(err.code)
      );
    } else {
      setErrror(true);
    }
  };
  //! Push to home page
  const [user, userLoading, userError] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className=" glassorism  container  flex h-[25rem] w-[30rem] flex-col items-center p-10">
        <h1 className="mb-4 mr-auto text-4xl font-semibold tracking-wider underline decoration-sky-500">
          Qeydiyyat
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
        <button
          onClick={register}
          className="relative mt-6 h-12 w-1/2 rounded border-2 border-b-4 border-sky-500  tracking-wider transition-all  hover:border-sky-800 hover:bg-sky-500 hover:text-white"
        >
          Qeydiyyatı Tamamla
        </button>
      </div>
    </div>
  );
};

export default Index;
