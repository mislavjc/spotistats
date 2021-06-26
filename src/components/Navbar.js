import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AlbumIcon from '@material-ui/icons/Album';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from '@material-ui/core/Typography';

export const Navbar = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState(null);
  const [darkMode, setDarkMode] = useState('false');
  const [color, setColor] = useState(null);

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
    setColor(localStorage.getItem('theme'));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <div className="account">
          {session && !loading ? (
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
              <IconButton aria-label="account of current user" onClick={handleClick}>
                <Avatar src={session.user.picture} />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <List style={{ paddingRight: '1rem', cursor: 'pointer' }}>
                  <Link href="/top-tracks" passHref>
                    <ListItem onClick={handleClose}>
                      <ListItemAvatar>
                        <Avatar>
                          <LibraryMusicIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Top tracks" />
                    </ListItem>
                  </Link>
                  <Divider variant="inset" component="li" />
                  <Link href="/top-albums" passHref>
                    <ListItem onClick={handleClose}>
                      <ListItemAvatar>
                        <Avatar>
                          <AlbumIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Top albums" />
                    </ListItem>
                  </Link>
                  <Divider variant="inset" component="li" />
                  <Link href="/top-artists" passHref>
                    <ListItem onClick={handleClose}>
                      <ListItemAvatar>
                        <Avatar>
                          <RecordVoiceOverIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Top artists" />
                    </ListItem>
                  </Link>
                  <Divider variant="inset" component="li" />
                  <ListItem onClick={signOut}>
                    <ListItemAvatar>
                      <Avatar>
                        <MeetingRoomIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Sign out" />
                  </ListItem>
                </List>
              </Menu>
            </div>
          ) : (
            <Button variant="outlined" className="btn" onClick={signIn}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
