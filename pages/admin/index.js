import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/Loading';
import { auth } from '../../firebase/firebase';

const Index = () => {
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
  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
      {user ? (
        <div className="h-full w-full">
          {authAdmin() ? (
            <div className="h-full w-full  p-20">
              <Link href={'/admin/addtest'}>
                <a className="glassorism flex items-center justify-center w-[12rem] h-[4rem] transition-all  relative  ">
                  Test Elave et
                </a>
              </Link>
            </div>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Index;
