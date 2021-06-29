import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';

export const Navbar = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  return (
    <nav>
      <div className="nav">
        <div className="logo">
          <Link href="/" passHref>
            <h1>Spotistats</h1>
          </Link>
        </div>
        <div className="links">
          <Link href="/top-tracks" passHref>
            <h3>Tracks</h3>
          </Link>
          <Link href="/top-artists" passHref>
            <h3>Artists</h3>
          </Link>
        </div>
        <div>
          {session && !loading ? (
            <div className="account">
              <Image className="avatar" src={session.user.picture} width={40} height={40} alt="user profile picture" />
              <h3>Profile</h3>
            </div>
          ) : (
            <h3 className="login" onClick={signIn}>
              Sign in
            </h3>
          )}
        </div>
      </div>
    </nav>
  );
};
