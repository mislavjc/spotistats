import Head from 'next/head';
import '@/styles/Styles.global.scss';
import { Provider } from 'next-auth/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Router from 'next/router';
// @ts-ignore
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { AppProps  } from 'next/app';

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
      <Provider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
