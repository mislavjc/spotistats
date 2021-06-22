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
import Typography from "@material-ui/core/Typography"
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router"
import Image from "next/image"

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
  const { album } = context.query
  const response = await axios.get(`https://api.spotify.com/v1/albums/${album}`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`
    }
  })
  return {
    props: {
      album: response.data
    }
  }
}

export default function TopTracks({ album }) {
  return (
    <Container maxWidth="sm">
      <Paper variant="outlined">
        <AnimateSharedLayout>
          <AnimatePresence>
            <List>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0}
                layoutId={0}
              >
                <ListItem>
                  <Image src={album.images[0].url} alt={album.title} layout="intrinsic" width={200} height={200} />
                  <ListItemText
                    className="album-header"
                    style={{ marginLeft: "1rem" }}
                    primary={<Typography variant="h4">{album.name}</Typography>}
                    secondary={<Typography variant="h6" color="textSecondary">{album.artists.map((artist, index) => (
                      <span key={artist.name}>
                        {album.artists.length > 1 ? album.artists.length !== index + 1 ? artist.name + ", " : artist.name : artist.name}
                      </span>
                    ))}</Typography>}
                  />
                </ListItem>
              </motion.div>
              {album.tracks.items.map((track, index) => (
                <span key={track.name}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layoutId={track.name}
                  >
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>{index + 1}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={track.name}
                        secondary={track.artists.map((artist, index) => (
                          <span key={artist.name}>
                            {track.artists.length > 1 ? track.artists.length !== index + 1 ? artist.name + ", " : artist.name : artist.name}
                          </span>
                        ))}
                      />
                    </ListItem>
                    {index !== album.tracks.items.length - 1 && <Divider variant="middle" />}
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