import React, { useState } from 'react';
import LoginButton from '../components/LoginButton';
import educationAnimationData from '../lottie/back-to-school.json';
import Lottie from 'react-lottie';
import Typewriter from 'typewriter-effect';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import ContactPopUp from '../components/ContactPopUp';
const Index = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [modal, setModal] = useState(false);
  const educationAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: educationAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
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
        <button className="glassorism h-12 w-44 transition-all hover:bg-sky-500/80 hover:text-white">
          Əlaqə
        </button>
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