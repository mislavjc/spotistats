import { getSession } from "next-auth/client";
import axios from "axios"
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.01,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: "/api/auth/signin" });
    context.res.end();
    return {
      props: {
        tracks: false,
      }
    };
  }
  const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`
    }
  })
  const { items } = response.data
  return {
    props: {
      tracks: items
    }
  }
}

export default function TopTracks({ tracks }) {
  return (
    <Container maxWidth="sm">
      <Paper variant="outlined">
        <AnimateSharedLayout>
          <AnimatePresence>
            <List>
              {tracks.map((track, index) => (
                <span key={track.name}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layoutId={track.name}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant="square" src={track.album.images[0].url} alt={track.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={track.name}
                        secondary={track.artists.map((artist, index) => (
                          <span key={artist.name}>
                            {track.artists.length > 1 ? track.artists.length !== index + 1 ? artist.name + ", " : artist.name : artist.name}
                          </span>
                        ))} />
                    </ListItem>
                    <Divider variant="middle" />
                  </motion.div>
                </span>
              ))}
            </List>
          </AnimatePresence>
        </AnimateSharedLayout>
      </Paper>
    </Container>
  )
}