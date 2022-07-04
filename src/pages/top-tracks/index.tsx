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

import {
  millisToMinutesAndSeconds,
  getTotalLenght,
  featuredArtists,
  getTimeSpans,
} from '@/lib/utils';
import { cardVariants } from '@/lib/framer';
import { useTracks, useStoreUser } from '@/hooks/swr';
import { usePlaylist, useRange } from '@/hooks';

import { Artist, Item } from '@/types/track-types';

import styles from '@/styles/Tracks.module.scss';

const timeSpans = getTimeSpans('artists');

export default function TopTracks() {
  const { selected, setSelected, pathTop, pathBottom, range, handleClick } = useRange(
    'tracks',
    timeSpans,
  );

  const user = useStoreUser();

  const {
    createPlaylist,
    backdropHandler,
    error,
    name,
    setName,
    description,
    setDescription,
    open,
    showForm,
    setShowForm,
    playlistTitle,
    url,
  } = usePlaylist('tracks');

  const { tracks, color, cover, isLoading } = useTracks(
    user.accessToken ? `${range}/${user?.accessToken}` : null,
  );

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
                setSelected(time);
                handleClick(time.span, index);
              }}
              selected={selected === time}
              layoutId="chip-container"
              spaced
              capitalized
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
            <Button
              color="secondary"
              size="sm"
              onClick={() => createPlaylist({ name, description, playlistData: tracks, user })}
            >
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
