import { getSession } from 'next-auth/client';
import { useState } from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { getSpotifyData, getArtistData } from '@/lib/http';
import { cardVariants, modalVariants, spring } from '@/lib/framer';
import axios from 'axios';
import Image from 'next/image';
import { millisToMinutesAndSeconds, getColor, getTotalLenght, featuredArtists } from '@/lib/utils';
import styles from '@/styles/Tracks.module.scss';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Tracks, Artist, Item, TrackProps } from '@/types/track-types';
import { TimeSpan } from '@/types/shared-types';

export const getServerSideProps: GetServerSideProps = async context => {
  const session: any = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/api/auth/signin' });
    context.res.end();
    return {
      props: {
        tracks: false,
      },
    };
  }
  const tracks: Tracks = {
    short_term: await getSpotifyData(
      '/me/top/tracks?time_range=short_term&limit=30',
      session?.user?.accessToken,
    ),
    medium_term: await getSpotifyData(
      '/me/top/tracks?time_range=medium_term&limit=30',
      session?.user?.accessToken,
    ),
    long_term: await getSpotifyData(
      '/me/top/tracks?time_range=long_term&limit=30',
      session!.user!.accessToken,
    ),
  };
  const short_artist = await getArtistData(
    tracks!.short_term[0]!.artists[0]!.id,
    session?.user?.accessToken,
  );
  const medium_artist = await getArtistData(
    tracks!.medium_term[0]!.artists[0]!.id,
    session?.user?.accessToken,
  );
  const long_artist = await getArtistData(
    tracks.long_term[0].artists[0].id,
    session?.user?.accessToken,
  );
  const short_color = await getColor(tracks.short_term[0].album.images[0].url);
  const medium_color = await getColor(tracks.medium_term[0].album.images[0].url);
  const long_color = await getColor(tracks.long_term[0].album.images[0].url);
  const timeSpans: TimeSpan[] = [
    {
      span: 'short_term',
      title: 'Last month',
      color: short_color,
      cover: short_artist.images[1].url,
      pathTop:
        'M0,288L48,240C96,192,192,96,288,64C384,32,480,64,576,69.3C672,75,768,53,864,48C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
      pathBottom:
        'M0,0L48,16C96,32,192,64,288,96C384,128,480,160,576,149.3C672,139,768,85,864,80C960,75,1056,117,1152,117.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    },
    {
      span: 'medium_term',
      title: 'Last six months',
      color: medium_color,
      cover: medium_artist.images[1].url,
      pathTop:
        'M0,64L48,64C96,64,192,64,288,85.3C384,107,480,149,576,176C672,203,768,213,864,208C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
      pathBottom:
        'M0,64L48,85.3C96,107,192,149,288,144C384,139,480,85,576,90.7C672,96,768,160,864,170.7C960,181,1056,139,1152,149.3C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    },
    {
      span: 'long_term',
      title: 'Overall',
      color: long_color,
      cover: long_artist.images[1].url,
      pathTop:
        'M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,106.7C672,96,768,128,864,165.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
      pathBottom:
        'M0,64L48,101.3C96,139,192,213,288,208C384,203,480,117,576,80C672,43,768,53,864,48C960,43,1056,21,1152,32C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    },
    { span: 'artists', title: 'Artists',   color: long_color,
      cover: long_artist.images[1].url,
      pathTop:
        'M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,106.7C672,96,768,128,864,165.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
      pathBottom:
        'M0,64L48,101.3C96,139,192,213,288,208C384,203,480,117,576,80C672,43,768,53,864,48C960,43,1056,21,1152,32C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z', },
  ];
  return {
    props: {
      tracks,
      timeSpans,
      token: session?.user?.accessToken,
      id: session?.user?.id,
      username: session?.user?.name,
    },
  };
};

export default function TopTracks({ tracks, token, id, timeSpans, username } : TrackProps) {
  const router = useRouter();
  const [data, setData] = useState<Tracks>(tracks);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState(timeSpans[0]);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [range, setRange] = useState(timeSpans[0].span);
  const [color, setColor] = useState(timeSpans[0].color);
  const [pathTop, setPathTop] = useState(timeSpans[0].pathTop);
  const [pathBottom, setPathBottom] = useState(timeSpans[0].pathBottom);
  const [cover, setCover] = useState(timeSpans[0].cover);
  const [error, setError] = useState(false);

  const handleClick = (range: string, index: number) => {
    if (range === 'artists') {
      router.push('/top-artists');
    } else {
      setRange(range);
      setColor(timeSpans[index].color);
      setPathTop(timeSpans[index].pathTop);
      setPathBottom(timeSpans[index].pathBottom);
      setCover(timeSpans[index].cover);
    }
  };

  const createPlaylist = async (name: string, description: string) => {
    const playlistData: Item[] = data[range];
    if (name) {
      axios
        .post('/api/create-playlist', { id, token, playlistData, name, description })
        .then(res => {
          setOpen(true);
          setShowForm(false);
          setPlaylistTitle(name);
          setName('');
          setDescription('');
          setUrl(res.data);
        });
    } else {
      console.log('no name');
      setError(true);
    }
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
              setError(false);
            }}
          />
        )}
        <motion.div
          className="overlay"
          initial={false}
          animate={{ background: `linear-gradient(180deg, ${color} 10%, #121212 100%)` }}
        />
      </AnimatePresence>
      <div className={styles.header}>
        <div className={styles.header__image}>
          <span>
            <div className={styles.wave__top}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <motion.path
                  initial={false}
                  animate={{ fill: color }}
                  fillOpacity="0.9"
                  d={pathTop}
                ></motion.path>
              </svg>
            </div>
            <div>
              <Image src={cover} alt="cover image" height={250} width={250} />
            </div>
            <div className={styles.wave__bottom}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <motion.path
                  initial={false}
                  animate={{ fill: color }}
                  fillOpacity="0.9"
                  d={pathBottom}
                ></motion.path>
              </svg>
            </div>
            <motion.div
              className={styles.wave__cover}
              initial={false}
              animate={{ background: color }}
            />
            <h1 className={styles.wave__title}>Top songs</h1>
          </span>
        </div>
        <div className={styles.header__text}>
          <h5>Playlist</h5>
          <h1 className={styles.pageTitle}>Top songs</h1>
          <p>
            {featuredArtists(data[range])[0]}, {featuredArtists(data[range])[1]} and more
          </p>
          <p className={styles.header__description}>
            Made for &nbsp;<span className={styles.header__username}>{username}</span>
            &nbsp; <span className={styles.dot} /> 30 songs, {getTotalLenght(data[range])}
          </p>
        </div>
      </div>
      <div className="container">
        <AnimateSharedLayout>
          <div className="chip-container">
            {timeSpans.map((time, index: number) => (
              <button
                key={time.span}
                className="chip-outlined"
                onClick={() => {
                  setSelected(time);
                  handleClick(time.span, index);
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
          <button className="btn" onClick={() => setShowForm(true)}>
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
              {data[range].map((track: Item, index: number) => (
                <div key={track.name}>
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
                          {track.artists.map((artist: Artist, index: number) => (
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
                className={error ? 'inputError' : undefined}
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
