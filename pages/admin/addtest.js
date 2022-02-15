import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/Loading';
import { auth, db } from '../../firebase/firebase';
import { AwesomeButtonProgress } from 'react-awesome-button';
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
  const [error, setError] = useState(false);
  const [testTitle, setTestTitle] = useState();
  const [testUrl, setTestUrl] = useState('');
  const [testCategory, setTestCategory] = useState('az-dili');
  const [testClass, setTestClass] = useState(9);
  useEffect(() => {
    if (
      testTitle &&
      testUrl &&
      testCategory &&
      testClass &&
      testUrl.includes('https://docs.google.com/forms/d/e/')
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [testTitle, testUrl, testCategory, testClass]);
  const handleAddTest = async () => {
    const uniqeId = Math.random().toString(36).substr(2, 9);
    if (!error) {
      const docRef = doc(db, 'exams', uniqeId);
      await setDoc(docRef, {
        title: testTitle,
        url: testUrl,
        category: testCategory,
        class: testClass,
        id: uniqeId,
        author: user.email.replace('@gmail.com', ''),
      });
      await setTestCategory('az-dili');
      await setTestClass(9);
      await setTestTitle('');
      await setTestUrl('');
    }
  };
  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
      {user ? (
        <div>
          {authAdmin() ? (
            <div className="glassorism flex h-[38rem] w-[40rem] flex-col items-center gap-y-6 rounded border-2 p-10">
              <h1 className="mb-4 text-3xl font-semibold underline decoration-sky-500">
                Test əlvə edin
              </h1>
              <label className=" group  relative h-12  w-full">
                <div className="absolute -top-3 left-2 translate-y-3 bg-transparent bg-white text-gray-500 opacity-0 transition-all group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  Testin adını daxil edin
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    setTestTitle(e.target.value);
                  }}
                  value={testTitle}
                  required
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
                  required
                  value={testUrl}
                  placeholder="Test Linkini Əlavə edin"
                  className=" h-full w-full rounded border-2  border-gray-400 px-4 outline-none transition-all focus-within:border-sky-500 group-focus-within:placeholder:text-white"
                />
              </label>
              <select
                required
                onChange={(e) => {
                  setTestClass(e.target.value);
                }}
                value={testClass}
                className="h-12 w-full rounded  border-2  border-gray-400 p-2 outline-none focus-within:border-sky-500"
              >
                <option value="9" selected>
                  9 cu sinif
                </option>
                <option value="8"> 8 ci sinif</option>
                <option value="7"> 7 ci sinif</option>
                <option value="6"> 6 cı sinif</option>
              </select>
              <select
                required
                value={testCategory}
                onChange={(e) => {
                  setTestCategory(e.target.value);
                }}
                className="h-12 w-full rounded  border-2  border-gray-400 p-2 outline-none focus-within:border-sky-500"
              >
                <option value="az-dili" selected>
                  Azərbaycan dili
                </option>
                <option value="riyaziyyat">Riyaziyyat</option>
                <option value="ingilis-dili"> İngilis dili</option>
                <option value="tarix">Tarix</option>
              </select>
              {error ? (
                <div className="animate-pulse text-lg text-red-500">
                  Lutfen tam doldurun
                </div>
              ) : null}
              <AwesomeButtonProgress
                type="primary"
                disabled={('disabled', error ? true : false)}
                loadingLabel="Yüklənir"
                releaseDelay={700}
                size={'large'}
                action={(element, next) => {
                  handleAddTest();
                  setTimeout(() => {
                    next();
                  }, 700);
                }}
                resultLabel={'Elave edildi'}
              >
                Yüklə
              </AwesomeButtonProgress>
            </div>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AddTest;
