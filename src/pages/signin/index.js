import { getProviders, signIn } from 'next-auth/client';
import Link from 'next/link';
import styles from '@/styles/Login.module.scss';

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default function SignIn({ providers }) {
  return (
    <div className={styles.container}>
      <div>
        <h1>Spotistats requires a Spotify account in order to work.</h1>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button className="btn" onClick={() => signIn(provider.id)}>
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

