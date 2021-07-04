import { getSession } from 'next-auth/client';
import { useState } from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { getSpotifyData } from '@/lib/http';
import { cardVariants, modalVariants, spring } from '@/lib/framer';
import axios from 'axios';
import Image from 'next/image';
import { millisToMinutesAndSeconds, getColor } from '@/lib/utils';
import styles from '@/styles/Tracks.module.scss';
import Head from 'next/head';

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
  const { items } = await getSpotifyData('/me/top/tracks?limit=30', session.user.accessToken);
  const primary = await getColor(items[0].album.images[0].url, 2);
  return {
    props: {
      tracks: items,
      token: session.user.accessToken,
      id: session.user.id,
      primary,
    },
  };
}

const timeSpans = [
  { span: 'short_term', title: 'Last month' },
  { span: 'medium_term', title: 'Last six months' },
  { span: 'long_term', title: 'Overall' },
  { span: 'artists', title: 'Artists' },
];

export default function TopTracks({ tracks, token, id, primary }) {
  const router = useRouter();
  const [data, setData] = useState(tracks);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState(timeSpans[1]);
  const [color, setColor] = useState(primary);
  const [playlistTitle, setPlaylistTitle] = useState('');

  const handleClick = async range => {
    if (range === 'artists') {
      router.push('/top-artists');
    }
    const response = await axios.post('/api/time-range-tracks', { range, token });
    setData(response.data);
    const newColor = await axios.post('/api/color', response.data);
    setColor(newColor.data);
  };

  const createPlaylist = async (name, description) => {
    axios.post('/api/create-playlist', { id, token, data, name, description }).then(res => {
      setOpen(true);
      setShowForm(false);
      setPlaylistTitle(name);
      setName('');
      setDescription('');
      setUrl(res.data);
    });
  };

  return (
    <>
      <Head>
        <title>Top tracks | Spotistats</title>
      </Head>
      <AnimatePresence>
        {(showForm || open) && (
          <motion.div
            initial={{ opacity: 0 }}
            key="overlay"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={() => {
              setShowForm(false);
              setOpen(false);
            }}
          />
        )}
        <motion.div
          className="overlay"
          initial={false}
          animate={{ background: `linear-gradient(180deg, ${color} 10%, #121212 100%)` }}
        />
      </AnimatePresence>
      <h1 className={styles.pageTitle}>Top songs</h1>
      <div className="container">
        <AnimateSharedLayout>
          <div className="chip-container">
            {timeSpans.map((time, index) => (
              <button
                key={time.span}
                className="chip-outlined"
                onClick={() => {
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
                        {track.explicit && <span className={styles.explicit}>E</span>}
                        <span>
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
              key="playlist-modal"
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
        <AnimatePresence>
          {open && (
            <motion.div
              variants={modalVariants}
              className="modal modal-light playlist-modal"
              initial="hidden"
              animate="visible"
              exit="exit"
              key="playlist-created-modal"
            >
              <h2>Playlist created successfully!</h2>
              <p>{playlistTitle} was added to your library.</p>
              <div className="button__container">
                <button onClick={() => window.open(url, '_blank')} className="btn-sm-green">
                  Open playlist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
