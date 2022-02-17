import React from 'react';
import educationAnimationData from '../lottie/back-to-school.json';
import Lottie from 'react-lottie';
import Typewriter from 'typewriter-effect';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { AwesomeButton } from 'react-awesome-button';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/LoadingScreen';
const Index = () => {
  const rotuer = useRouter();
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
    if (user && user?.email === 'admin@gmail.com') {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="flex h-[calc(100vh-5rem)] px-20 ">
      <LoadingScreen />
      <div className="flex h-full w-1/2  flex-col  justify-center">
        <h1 className="glassorism mb-10  w-[75%] p-4 text-3xl font-semibold leading-[50px] tracking-wider text-black">
          {user ? (
            <>
              {user?.displayName || user?.email.replace('@gmail.com', '')}{' '}
              <br />
              Xoş gəlmisiniz Platformadan İstifadənin Keyfini çıxarın
            </>
          ) : (
            <>Dərslər ilə bağlı hər şey bir məkanda</>
          )}
        </h1>
        <p className="glassorism mb-6 w-[75%] p-4 text-[17px] text-gray-600 ">
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
          <AwesomeButton
            type="primary"
            size={'medium'}
            ripple={true}
            action={() => {
              rotuer.push('/admin');
            }}
          >
            Admin
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
