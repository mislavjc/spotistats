import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.scss';

export const Navbar = () => {
  const [session, loading] = useSession();

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <h1>Spotistats</h1>
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/top-tracks" passHref>
            <h3>Tracks</h3>
          </Link>
          <Link href="/top-artists" passHref>
            <h3>Artists</h3>
          </Link>
        </div>
        <div>
          {session && !loading ? (
            <div className={styles.account}>
              <Image
                className={styles.avatar}
                src={session.user.picture}
                width={40}
                height={40}
                alt="user profile picture"
              />
              <h3>Profile</h3>
            </div>
          ) : (
            <h3 className={styles.login} onClick={signIn}>
              Sign in
            </h3>
          )}
        </div>
      </div>
    </nav>
  );
};
