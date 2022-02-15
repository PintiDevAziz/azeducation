import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MainContextProvider } from '../helpers/MainContext';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import 'react-awesome-button/dist/themes/theme-blue.css';
import Head from 'next/head';

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
      <Head>
        <title>Az Education</title>
        <meta name="title" content="Az Education" />
        <meta
          name="description"
          content="Telebelrin tehsil ile bagli bir yere toplanmasi ucun olan ve pintiDevAziz terefinden kodlanan platform"
        />
        <meta
          name="keywords"
          content="Az Edcaution, Online Tehsil , Online Sinaqlar, Pomdoor timer , Kitabxana,  online vide ders izahlari"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta property="og:url" content="https://az-education.vercel.app/" />
      </Head>
      {showHeader ? <Header /> : null}
      <Component {...pageProps} />
      <Footer />
    </MainContextProvider>
  );
}

export default MyApp;
