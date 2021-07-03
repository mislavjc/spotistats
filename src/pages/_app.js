import Head from 'next/head';
import '@/styles/Styles.global.scss';
import { Provider } from 'next-auth/client';
import { Navbar } from '@/components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Spotistats</title>
      </Head>
      <Provider session={pageProps.session}>
        <Navbar />
        <div style={{ marginTop: '5.3rem' }} />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
