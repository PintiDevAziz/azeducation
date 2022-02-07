import React, { useState } from 'react';
import LoginButton from '../components/LoginButton';
import educationAnimationData from '../lottie/back-to-school.json';
import Lottie from 'react-lottie';
import Typewriter from 'typewriter-effect';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Index = () => {
  // user girmesini denegler
  const [user, userLoading, userError] = useAuthState(auth);
  const educationAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: educationAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const authAdmin = () => {
    if (user?.email === 'admin@gmail.com') {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="flex h-[calc(100vh-5rem)] px-20 ">
      <div className="flex h-full w-1/2  flex-col  justify-center">
        <h1 className="glassorism mb-10  w-[75%] p-4 text-4xl font-semibold leading-[50px] tracking-wider text-black">
          {user ? (
            <>
              {user?.displayName || user?.email.replace('@gmail.com', '')}{' '}
              <br />
              Xos gelmisniz Artıq saytdan istifadə edə bilersiniz
            </>
          ) : (
            <>Dərslər ilə bağlı hər şey bir məkanda</>
          )}
        </h1>
        <p className="glassorism mb-6 w-[75%] p-4 text-[17px] text-gray-500">
          <Typewriter
            options={{
              strings: [
                'Bu web səhifə vasitəsi ilə siz Video dərs izahlarında,Kitablardan,Sınaqlardan pulsuz bir şəkildə faydalana bilersiniz',
                'Pulsuz olması pis olduması mənasını vermir :)',
                'Fikirlərini bizə yazıb dəstək verməyi unutma',
                'Hesabın yoxdursa qeydiyyatdan keç saytdan isitifadə üçün qeydiyyat zəruridir',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </p>
        {authAdmin() ? (
          <AwesomeButton type="primary" size={'medium'} ripple={true}>
            <Link href={'/admin'}>admin</Link>
          </AwesomeButton>
        ) : (
          <AwesomeButton type="primary" size={'medium'} ripple={true}>
            Əlaqə
          </AwesomeButton>
        )}
      </div>
      <div className="h-full w-1/2">
        <Lottie
          options={educationAnimationOptions}
          isClickToPauseDisabled={true}
        />
      </div>
    </div>
  );
};

export default Index;
