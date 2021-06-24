import Head from 'next/head';
import '@/css/main.min.css';
import { Provider } from 'next-auth/client';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Navbar } from '@/components/Navbar';
import { useState, useEffect } from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[800],
    },
  },
  typography: {
    fontFamily: 'Inter',
  },
});

const lightTheme = createMuiTheme({
  ...theme,
  palette: {
    type: 'light',
  },
});

const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    type: 'dark',
    primary: {
      main: deepPurple[100],
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState('false');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDarkMode(localStorage.getItem('darkMode'));
  }, [mounted]);

  const themeConfig = darkMode === 'true' ? darkTheme : lightTheme;

  return (
    <>
      <Head>
        <title>Top tracks</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={themeConfig}>
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
      <style jsx global>{`
        body {
          background: ${darkMode === 'true' ? '#333' : 'white'};
        }
      `}</style>
    </>
  );
}

export default MyApp;
