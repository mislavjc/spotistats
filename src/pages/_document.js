import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Find your Spotify listening habbits and statistics." />
          <meta
            name="og:description"
            content="Find your Spotify listening habbits and statistics."
          />
          <meta name="theme-color" content="#282828" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
