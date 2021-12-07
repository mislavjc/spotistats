import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import Backdrop from '@/components/Backdrop/Backdrop';
import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import Modal from '@/components/Modal/Modal';
import Chip from '@/components/Chip/Chip';
import Cover from '@/components/Cover/Cover';
import Skeleton from '@/components/Skeleton/Skeleton';
import SkeletonTable from '@/components/Skeleton/SkeletonTable';

import { millisToMinutesAndSeconds, getTotalLenght, featuredArtists } from '@/lib/utils';
import { cardVariants } from '@/lib/framer';
import { useTracks, useStoreUser } from '@/hooks/swr';

import { Artist, Item } from '@/types/track-types';

import styles from '@/styles/Tracks.module.scss';

const timeSpans = [
  {
    span: 'short_term',
    title: 'Last month',
    pathTop:
      'M0,288L48,240C96,192,192,96,288,64C384,32,480,64,576,69.3C672,75,768,53,864,48C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,0L48,16C96,32,192,64,288,96C384,128,480,160,576,149.3C672,139,768,85,864,80C960,75,1056,117,1152,117.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    span: 'medium_term',
    title: 'Last six months',
    pathTop:
      'M0,64L48,64C96,64,192,64,288,85.3C384,107,480,149,576,176C672,203,768,213,864,208C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,64L48,85.3C96,107,192,149,288,144C384,139,480,85,576,90.7C672,96,768,160,864,170.7C960,181,1056,139,1152,149.3C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    span: 'long_term',
    title: 'Overall',
    pathTop:
      'M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,106.7C672,96,768,128,864,165.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,64L48,101.3C96,139,192,213,288,208C384,203,480,117,576,80C672,43,768,53,864,48C960,43,1056,21,1152,32C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    span: 'artists',
    title: 'Artists',
    pathTop:
      'M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,106.7C672,96,768,128,864,165.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,64L48,101.3C96,139,192,213,288,208C384,203,480,117,576,80C672,43,768,53,864,48C960,43,1056,21,1152,32C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
];

export default function TopTracks() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState(timeSpans[0].span);
  const [pathTop, setPathTop] = useState(timeSpans[0].pathTop);
  const [pathBottom, setPathBottom] = useState(timeSpans[0].pathBottom);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [range, setRange] = useState(timeSpans[0].span);
  const [error, setError] = useState(false);

  const user = useStoreUser();

  const { tracks, color, cover, isLoading } = useTracks(
    user.accessToken ? `${range}/${user?.accessToken}` : null,
  );

  const handleClick = (range: string, index: number) => {
    if (range === 'artists') {
      router.push('/top-artists');
    } else {
      setRange(range);
      setPathTop(timeSpans[index].pathTop);
      setPathBottom(timeSpans[index].pathBottom);
    }
  };

  const backdropHandler = () => {
    setShowForm(false);
    setOpen(false);
  };

  const createPlaylist = async (name: string, description: string) => {
    const playlistData: Item[] = tracks;
    if (name) {
      axios
        .post('/api/create-playlist', {
          id: user?.id,
          token: user?.accessToken,
          playlistData,
          name,
          description,
        })
        .then(res => {
          setOpen(true);
          setShowForm(false);
          setPlaylistTitle(name);
          setName('');
          setDescription('');
          setUrl(res.data);
        });
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <title>Top tracks | Spotistats</title>
      </Head>
      <motion.div
        className="overlay"
        initial={false}
        animate={{ background: `linear-gradient(180deg, ${color} 10%, #121212 100%)` }}
      />
      <Backdrop show={showForm || open} onClick={backdropHandler} />
      <div className={styles.header}>
        {isLoading ? (
          <div className={styles.header__skeleton}>
            <Skeleton
              size={{
                width: 250,
                height: 250,
              }}
            />
          </div>
        ) : (
          <Cover
            cover={cover}
            color={color}
            path={{
              top: pathTop,
              bottom: pathBottom,
            }}
            text="Top songs"
          />
        )}
        <div className={styles.header__text}>
          <h5>Playlist</h5>
          <h1 className={styles.pageTitle}>Top songs</h1>
          <p>
            {isLoading ? (
              <Skeleton
                size={{
                  width: 200,
                  height: 14,
                }}
              />
            ) : (
              `${featuredArtists(tracks)[0]}, ${featuredArtists(tracks)[1]}`
            )}{' '}
            and more
          </p>
          <p className={styles.header__description}>
            Made for &nbsp;
            <span className={styles.header__username}>
              {user?.name ? user.name : <Skeleton size={{ width: 100, height: 14 }} />}
            </span>
            &nbsp; <span className={styles.dot} /> 30 songs,
            {isLoading ? (
              <Skeleton
                size={{
                  width: 60,
                  height: 14,
                }}
              />
            ) : (
              getTotalLenght(tracks)
            )}
          </p>
        </div>
      </div>
      <div className="container">
        <div className="chip-container">
          {timeSpans.map((time, index: number) => (
            <Chip
              key={time.span}
              onClick={() => {
                setSelected(time.span);
                handleClick(time.span, index);
              }}
              selected={selected === time.span}
              layoutId="chip-container"
              spaced
            >
              {time.title}
            </Chip>
          ))}
        </div>
        <div className="fab-btn">
          <Button onClick={() => setShowForm(true)}>Create playlist</Button>
        </div>
        {isLoading ? (
          <SkeletonTable />
        ) : (
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
              {tracks?.map((track: Item, index: number) => (
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
                      <img
                        src={track.album.images[2].url}
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
                                  ? `${artist.name}, `
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
        )}
        <Modal show={showForm} padded rounded>
          <h2>Create a playlist</h2>
          <TextField
            placeholder="Add a name*"
            error={error}
            value={name}
            onChange={setName}
            fullWidth
          />
          <TextField
            placeholder="Add an optional description"
            value={description}
            onChange={setDescription}
            fullWidth
          />
          <div className="button__container">
            <Button color="secondary" size="sm" onClick={() => createPlaylist(name, description)}>
              Create
            </Button>
          </div>
        </Modal>
        <Modal show={open} padded rounded background="light">
          <h2>Playlist created successfully!</h2>
          <p>{playlistTitle} was added to your library.</p>
          <div className="button__container">
            <Button size="sm" onClick={() => window.open(url, '_blank')}>
              Open playlist
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
