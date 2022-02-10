import React, { useEffect, useState, useMemo } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { auth } from '../../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  reauthenticateWithRedirect,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AwesomeButton } from 'react-awesome-button';
import { sendEmailVerification } from 'firebase/auth';
const Index = () => {
  //! Router
  const router = useRouter();
  const [isEye, setIsEye] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vpassword, setVpassword] = useState('');
  const [error, setErrror] = useState('Xeta var');
  //normal login
  const handleIsPswMatch = (e) => {
    setVpassword(e.target.value);
  };
  useMemo(() => {
    if (password !== vpassword) {
      setErrror('Sifreler eyni deyil');
    } else {
      setErrror('');
    }
  }, [vpassword]);
  const register = async () => {
    if (error) {
      setErrror('xeta bas verdi');
    } else {
      await createUserWithEmailAndPassword(auth, email, password).catch(
        (err) => {
          setErrror(err && err.code.replace('auth/', ''));
        }
      );
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
      <div className=" glassorism  container  flex h-[30rem] w-[30rem] flex-col items-center p-10">
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
        <label className="group  relative my-4  h-12 w-full">
          <div className="absolute -top-3 left-2 translate-y-3 bg-transparent bg-white text-gray-500 opacity-0 transition-all group-focus-within:translate-y-0 group-focus-within:opacity-100">
            Sifrenizi təsdiqləyin
          </div>
          <input
            type={isEye ? 'text' : 'password'}
            value={vpassword}
            onChange={handleIsPswMatch}
            placeholder="Sifrenizi təsdiqləyin"
            className=" h-full w-full rounded border-2 border-gray-400 px-4 outline-none transition-all focus-within:border-sky-500 group-focus-within:placeholder:text-white"
          />
        </label>
        <div className={`${error ? 'block' : 'hidden'} my-4 text-red-500`}>
          {error && error?.replace('/auth', '')}
        </div>
        <AwesomeButton
          type="primary"
          size={'lg'}
          disabled={
            ('disabled',
            error || email.length === 0 || password.length === 0 || vpassword.length === 0 ? true : false)
          }
          action={() => {
            register();
          }}
        >
          Qeydiyyati Tamamla
        </AwesomeButton>
      </div>
    </div>
  );
};

export default Index;
