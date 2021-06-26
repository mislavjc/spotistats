import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Typography from '@material-ui/core/Typography';

export const Navbar = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [darkMode, setDarkMode] = useState('false');

  const lightModeHandler = () => {
    setDarkMode(false);
    router.reload(window.location.pathname);
  };

  const darkModeHandler = () => {
    setDarkMode(true);
    router.reload(window.location.pathname);
  };

  useEffect(() => {
    setDarkMode(localStorage.getItem('darkMode'));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <nav>
      <div className="links">
        <Link href="/top-tracks">
          <Typography
            variant="h6"
            color={router.pathname === '/top-tracks' ? 'textPrimary' : 'textSecondary'}
          >
            Tracks
          </Typography>
        </Link>
        <Link href="/top-artists">
          <Typography
            variant="h6"
            color={router.pathname === '/top-artists' ? 'textPrimary' : 'textSecondary'}
          >
            Artists
          </Typography>
        </Link>
      </div>
      <div>
        {session && !loading ? (
          <div className="account">
            <div>
              {darkMode === 'true' ? (
                <IconButton onClick={lightModeHandler}>
                  <BrightnessHighIcon />
                </IconButton>
              ) : (
                <IconButton onClick={darkModeHandler}>
                  <Brightness4Icon />
                </IconButton>
              )}
            </div>
            <div>
              <Avatar src={session.user.picture} />
            </div>
          </div>
        ) : (
          <Button variant="outlined" className="btn" onClick={signIn}>
            Sign in
          </Button>
        )}
      </div>
    </nav>
  );
};
