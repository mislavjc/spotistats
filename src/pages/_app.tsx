import Head from 'next/head';
import Router from 'next/router';
import { SessionProvider } from 'next-auth/react';
// @ts-ignore
import NProgress from 'nprogress';

import type { AppProps } from 'next/app';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import 'nprogress/nprogress.css';
import '@/styles/Styles.global.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Spotistats</title>
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={20 * 60}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
