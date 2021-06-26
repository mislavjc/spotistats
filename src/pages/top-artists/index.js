import { getSession } from 'next-auth/client';
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
import { cardVariants } from '@/lib/framer';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/api/auth/signin' });
    context.res.end();
    return {
      props: {
        artists: false,
      },
    };
  }
  const { items } = await getSpotifyData('/me/top/artists', session.user.accessToken);
  return {
    props: {
      artists: items,
    },
  };
}

export default function TopArtists({ artists }) {
  const router = useRouter();

  console.log(artists)

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined">
        <AnimateSharedLayout>
          <AnimatePresence>
            <List>
              {artists.map((artist, index) => (
                <span key={artist.name}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layoutId={artist.name}
                  >
                    <ListItem button onClick={() => router.push('/artist/' + artist.id)}>
                      <ListItemAvatar>
                        <Avatar variant="square" src={artist.images[2].url} alt={artist.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={artist.name}
                        secondary={artist.genres.map((genre, index) => (
                          <span key={index}>
                            {artist.genres.length > 1
                              ? artist.genres.length !== index + 1
                                ? genre + ', '
                                : genre
                              : genre}
                          </span>
                        ))}
                      />
                    </ListItem>
                    {index !== artists.length - 1 && <Divider variant="middle" />}
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
