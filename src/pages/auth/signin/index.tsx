import { getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';

import styles from '@/styles/Login.module.scss';

import Button from '@/components/Button/Button';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  let redirectUrl = process.env.NEXTAUTH_URL;
  return {
    props: { providers, redirectUrl },
  };
};

export default function SignIn({ providers, redirectUrl }: any) {
  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get('callbackUrl');
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1>Spotistats requires a Spotify account in order to work.</h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <Button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: redirectUrl,
                })
              }
            >
              Continue to {provider.name}
            </Button>
          </div>
        ))}
        <p>*After signing into your Spotify account, you will be redirected back to Spotistats.</p>
        <h5>
          <Link href="/">Back to homepage.</Link>
        </h5>
      </div>
    </div>
  );
}
