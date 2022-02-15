import React from 'react';
import errorPage from '../lottie/404-page.json';
import Lottie from 'react-lottie';
const ErrorPage = () => {
  const errorAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: errorPage,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
      <div className="h-full w-full">
        <Lottie options={errorAnimationOptions} isClickToPauseDisabled={true} />
      </div>
    </div>
  );
};

export default ErrorPage;
