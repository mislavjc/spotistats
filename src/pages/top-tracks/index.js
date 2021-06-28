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
  console.log(session.user.id);
  const { items } = await getSpotifyData('/me/top/tracks', session.user.accessToken);
  return {
    props: {
      tracks: items,
      token: session.user.accessToken,
      id: session.user.id
    },
  };
}

export default function TopTracks({ tracks, token, id }) {
  const router = useRouter();
  const [data, setData] = useState(tracks);

  const handleClick = async range => {
    axios.post('/api/time-range-tracks', { range, token }).then(res => setData(res.data));
  };

  const createPlaylist = async () => {
    axios.post('/api/create-playlist', { id, token, data })
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
              <Button onClick={() => createPlaylist()}>Create playlist</Button>
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
    </Container>
  );
}
