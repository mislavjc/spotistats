import { getProviders, signIn } from 'next-auth/client';
import Link from 'next/link';
import styles from '@/styles/Login.module.scss';
import { useEffect } from 'react';

export async function getServerSideProps(context) {
  const providers = await getProviders();
  let redirectUrl = process.env.NEXTAUTH_URL;
  return {
    props: { providers, redirectUrl },
  };
}

export default function SignIn({ providers, redirectUrl }) {
  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get('callbackUrl');
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1>Spotistats requires a Spotify account in order to work.</h1>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button
              className="btn"
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: redirectUrl,
                })
              }
            >
              Continue to {provider.name}
            </button>
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
