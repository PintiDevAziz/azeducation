import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MainContextProvider } from '../helpers/MainContext';
import Header from '../components/Header';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import 'react-awesome-button/dist/themes/theme-blue.css';


function MyApp({ Component, pageProps }: AppProps) {
  const rotuer = useRouter();
  const [showHeader, setShowHeader] = useState(false);
  useEffect(() => {
    if (rotuer.asPath === '/login') {
      setShowHeader(false);
    } else if (rotuer.asPath === '/login/signup') {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [rotuer]);
  return (
    <MainContextProvider>
      {showHeader ? <Header /> : null}
      <Component {...pageProps} />
      <Footer />
    </MainContextProvider>
  );
}

export default MyApp;
