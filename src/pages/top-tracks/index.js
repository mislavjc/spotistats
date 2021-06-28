import { getSession } from 'next-auth/client';
import { useState } from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { getSpotifyData } from '@/lib/http';
import { cardVariants, modalVariants } from '@/lib/framer';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/api/auth/signin' });
    context.res.end();
    return {
      props: {
        tracks: false,
      },
    };
  }
  const { items } = await getSpotifyData('/me/top/tracks', session.user.accessToken);
  return {
    props: {
      tracks: items,
      token: session.user.accessToken,
      id: session.user.id,
    },
  };
}

export default function TopTracks({ tracks, token, id }) {
  const router = useRouter();
  const [data, setData] = useState(tracks);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClick = async range => {
    axios.post('/api/time-range-tracks', { range, token }).then(res => setData(res.data));
  };

  const createPlaylist = async (name, description) => {
    axios.post('/api/create-playlist', { id, token, data, name, description }).then(res => {
      setUrl(res.data);
      setMessage('Playlist created');
      setOpen(true);
      setShowForm(false);
      setName('');
      setDescription('');
    });
  };

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined">
        <AnimateSharedLayout>
          <AnimatePresence>
            <List>
              <ButtonGroup color="primary">
                <Button onClick={() => handleClick('short_term')}>One month</Button>
                <Button onClick={() => handleClick('medium_term')}>Six months</Button>
                <Button onClick={() => handleClick('long_term')}>Overall</Button>
              </ButtonGroup>
              <Button variant="outlined" onClick={() => setShowForm(true)}>
                Create playlist
              </Button>
              {data.map((track, index) => (
                <span key={track.name}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layoutId={track.name}
                  >
                    <ListItem button onClick={() => router.push('/album/' + track.album.id)}>
                      <ListItemAvatar>
                        <Avatar variant="square" src={track.album.images[2].url} alt={track.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={track.name}
                        secondary={track.artists.map((artist, index) => (
                          <span key={artist.name}>
                            {track.artists.length > 1
                              ? track.artists.length !== index + 1
                                ? artist.name + ', '
                                : artist.name
                              : artist.name}
                          </span>
                        ))}
                      />
                    </ListItem>
                    {index !== tracks.length - 1 && <Divider variant="middle" />}
                  </motion.div>
                </span>
              ))}
            </List>
          </AnimatePresence>
        </AnimateSharedLayout>
      </Paper>
      <AnimatePresence>
        {showForm && (
          <motion.div
            variants={modalVariants}
            className="modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            layoutId={'form-fab'}
          >
            <Paper style={{ padding: '1rem' }}>
              <div style={{ display: 'flex' }}>
                <Typography variant="h5">Create playlist</Typography>
                <Tooltip title="Zatvori">
                  <IconButton
                    style={{
                      position: 'relative',
                      top: '-8px',
                      marginLeft: 'auto',
                    }}
                    onClick={() => {
                      setShowForm(false);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <TextField
                id="playlist-title"
                label="Playlist title"
                variant="filled"
                style={{ marginBottom: '1rem' }}
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <TextField
                id="playlist-description"
                label="Playlist description"
                variant="filled"
                style={{ marginBottom: '1rem' }}
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <Button
                onClick={() => createPlaylist(name, description)}
                variant="contained"
                size="large"
                color="primary"
              >
                Create
              </Button>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
      <Backdrop style={{ color: '#fff', zIndex: 9 }} open={showForm} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <Button color="primary" onClick={() => window.open(url, '_blank')}>
            Open
          </Button>
        }
      />
    </Container>
  );
}
