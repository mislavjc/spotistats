import Head from 'next/head';
import '@/styles/Styles.global.scss';
import { Provider } from 'next-auth/client';
import { Navbar } from '@/components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Top tracks</title>
      </Head>
      <Provider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
