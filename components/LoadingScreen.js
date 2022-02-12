import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import bookLoadingData from '../lottie/book-loading.json';
const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const bookLoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: bookLoadingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useEffect((e) => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });
  return (
    <div
      className={`absolute inset-0 z-[1000000] flex h-full w-full -translate-y-full items-center justify-center bg-white   transition-all ${
        loading ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="h-[50rem] w-[50rem]">
        <Lottie options={bookLoadingOptions} isClickToPauseDisabled={true} />
      </div>
    </div>
  );
};

export default LoadingScreen;
