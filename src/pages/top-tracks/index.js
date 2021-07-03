import { getSession } from 'next-auth/client';
import { useState } from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { getSpotifyData } from '@/lib/http';
import { cardVariants, modalVariants, spring } from '@/lib/framer';
import axios from 'axios';
import Image from 'next/image';
import { millisToMinutesAndSeconds } from '@/lib/utils';
import styles from '@/styles/Tracks.module.scss';

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

const timeSpans = [
  { span: 'short_term', title: 'Last month' },
  { span: 'medium_term', title: 'Last six months' },
  { span: 'long_term', title: 'Overall' },
  { span: 'artists', title: 'Artists' },
];

export default function TopTracks({ tracks, token, id }) {
  const router = useRouter();
  const [data, setData] = useState(tracks);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState(timeSpans[1]);

  const handleClick = async range => {
    if (range === 'artists') {
      router.push('/top-artists');
    }
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

  return (
    <>
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
      <div className="container">
        <AnimateSharedLayout>
          <div className="chip-container">
            {timeSpans.map((time, index) => (
              <button
                key={time.span}
                className="chip-outlined"
                onClick={() => {
                  console.log('zesz');
                  setSelected(time);
                  handleClick(time.span);
                }}
              >
                {time.title}
                {selected === time && (
                  <motion.div
                    layoutId="outline"
                    className="border-green background-green"
                    initial={false}
                    transition={spring}
                  />
                )}
              </button>
            ))}
          </div>
        </AnimateSharedLayout>
        <div className="btn__container"></div>
        <div className="fab-btn">
          <button className="btn" variant="outlined" onClick={() => setShowForm(true)}>
            Create playlist
          </button>
        </div>
        <AnimateSharedLayout>
          <AnimatePresence>
            <div className={styles.table}>
              <div className={styles.table__header}>
                <div className={styles.header__index}>#</div>
                <div>&nbsp;</div>
                <div>Title</div>
                <div className={styles.header__album}>Album</div>
                <div>
                  <Image src="/icons/time.svg" alt="time icon" width={14} height={14} />
                </div>
              </div>
              {data.map((track, index) => (
                <div key={track.name} onClick={() => router.push('/album/' + track.album.id)}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layoutId={track.name}
                    className={styles.table__row}
                  >
                    <div className={styles.table__index}>{index + 1}</div>
                    <div>
                      <Image
                        src={track.album.images[1].url}
                        alt={track.name}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.table__credits}>
                      <span className={styles.title}>{track.name}</span>
                      <span className={styles.artists}>
                        {track.artists.map((artist, index) => (
                          <span key={artist.name}>
                            {track.artists.length > 1
                              ? track.artists.length !== index + 1
                                ? artist.name + ', '
                                : artist.name
                              : artist.name}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className={styles.table__album}>{track.album.name}</div>
                    <div>{millisToMinutesAndSeconds(track.duration_ms)}</div>
                  </motion.div>
                </div>
              ))}
            </div>
          </AnimatePresence>
        </AnimateSharedLayout>
        <AnimatePresence>
          {showForm && (
            <motion.div
              variants={modalVariants}
              className="modal playlist-modal"
              initial="hidden"
              animate="visible"
              exit="exit"
              layoutId="modal"
            >
              <h2>Create a playlist</h2>
              <input
                id="playlist-title"
                placeholder="Add a name*"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                id="playlist-description"
                placeholder="Add an optional description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div className="button__container">
                <button onClick={() => createPlaylist(name, description)} className="btn-sm">
                  Create
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
