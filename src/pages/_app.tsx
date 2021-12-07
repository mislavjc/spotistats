import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import '@/styles/Styles.global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
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

export default MyApp;
