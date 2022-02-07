import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/Loading';
import { auth } from '../../firebase/firebase';
import { AwesomeButtonProgress } from 'react-awesome-button';
import { db } from '../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
const AddTest = () => {
  const [user, userLoadin, userError] = useAuthState(auth);

  //! router
  const router = useRouter();
  const authAdmin = () => {
    if (user?.email === 'admin@gmail.com') {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (user) {
      if (!authAdmin()) {
        router.push('/');
      }
    }
  }, [user]);

  // ! Test data

  const [testName, setTestName] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [testClass, setTestClass] = useState();
  const [testAuthor, setTestAuthor] = useState();
  const [testCategory, setTestCategory] = useState();
  const uniqeTestId = Math.random().toString(16).slice(2);

  const docRef = doc(db, 'exams', uniqeTestId);
  //! Set Test

  const handleSetTest = async (e) => {
    e.preventDefault();
    await setDoc(docRef, {
      auth: testAuthor,
      category: testCategory,
      class: testClass,
      title: testName,
      url: testUrl,
    });
    await setTestAuthor('');
    await setTestName('');
    await setTestUrl('');
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
      {user ? (
        <div>
          {authAdmin() ? (
            <form className="flex h-[38rem] w-[40rem] flex-col items-center gap-y-6 rounded border-2 p-10">
              <h1 className="mb-4 text-3xl underline decoration-sky-500">
                Test əlvə edin
              </h1>
              <label className=" group  relative h-12  w-full">
                <div className="absolute -top-3 left-2 translate-y-3 bg-transparent bg-white text-gray-500 opacity-0 transition-all group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  Testin adını daxil edin
                </div>
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setTestName(e.target.value);
                  }}
                  value={testName}
                  placeholder="Testın adını daxil edin"
                  className=" h-full w-full rounded border-2  border-gray-400 px-4 outline-none transition-all focus-within:border-sky-500 group-focus-within:placeholder:text-white"
                />
              </label>
              <label className=" group  relative h-12  w-full">
                <div className="absolute -top-3 left-2 translate-y-3 bg-transparent bg-white text-gray-500 opacity-0 transition-all group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  Test Linkini Əlavə edin
                </div>
                <input
                  type="url"
                  onChange={(e) => {
                    setTestUrl(e.target.value);
                  }}
                  value={testUrl}
                  required
                  placeholder="Test Linkini Əlavə edin"
                  className=" h-full w-full rounded border-2  border-gray-400 px-4 outline-none transition-all focus-within:border-sky-500 group-focus-within:placeholder:text-white"
                />
              </label>
              <select
                required
                onChange={(e) => {
                  setTestClass(e.target.value);
                }}
                className="h-12 w-full rounded  border-2  border-gray-400 p-2 outline-none focus-within:border-sky-500"
              >
                <option value="" disabled>
                  Lutfen bir sinif secin
                </option>

                <option value="9">9 cu sinif</option>
                <option value="8"> 8 ci sinif</option>
                <option value="7"> 7 ci sinif</option>
                <option value="6"> 6 cı sinif</option>
              </select>
              <select
                required
                onChange={(e) => {
                  setTestAuthor(e.target.value);
                }}
                className="h-12 w-full rounded  border-2  border-gray-400 p-2 outline-none focus-within:border-sky-500"
              >
                <option value="" disabled>
                  Lutfen bir muellif secin
                </option>

                <option value="Aytən">Aytən</option>
                <option value="Gulcin"> Gulcin</option>
                <option value="Aziz"> Aziz</option>
                <option value="Bilmem kim"> Bilmem kim</option>
              </select>
              <select
                required
                onChange={(e) => {
                  setTestCategory(e.target.value);
                }}
                className="h-12 w-full rounded  border-2  border-gray-400 p-2 outline-none focus-within:border-sky-500"
              >
                <option value="" disabled>
                  Lutfen bir fenn secin
                </option>
                <option value="az-dili">Azərbaycan dili</option>
                <option value="riyaziyyat">Riyaziyyat</option>
                <option value="ingilis-dili"> İngilis dili</option>
                <option value="tarix">Tarix</option>
              </select>
              <button onClick={handleSetTest}>
                <AwesomeButtonProgress
                  type="primary"
                  loadingLabel="Yüklənir"
                  releaseDelay={400}
                  size={'large'}
                  action={(element, next) => {
                    setTimeout(() => {
                      next();
                    }, 400);
                  }}
                  resultLabel="Tamalandi"
                >
                  Button
                </AwesomeButtonProgress>
              </button>
            </form>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AddTest;
