import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';

import Backdrop from '@/components/Backdrop/Backdrop';
import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import Modal from '@/components/Modal/Modal';
import Chip from '@/components/Chip/Chip';
import Cover from '@/components/Cover/Cover';
import Skeleton from '@/components/Skeleton/Skeleton';
import SkeletonTable from '@/components/Skeleton/SkeletonTable';

import { cardVariants } from '@/lib/framer';
import { getTimeSpans, numFormatter } from '@/lib/utils';
import { usePlaylist, useRange } from '@/hooks';
import { useArtists, useStoreUser } from '@/hooks/swr';

import styles from '@/styles/Artists.module.scss';
import { Item } from '@/types/artist-types';

const timeSpans = getTimeSpans('tracks');

export default function TopArtists() {
  const {
    selected,
    setSelected,
    pathTop,
    pathBottom,
    range,
    handleClick,
  } = useRange('artists', timeSpans);

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
  } = usePlaylist('artists');

  const user = useStoreUser();

  const { artists, color, cover, isLoading } = useArtists(
    user.accessToken ? `${range}/${user?.accessToken}` : null,
  );

  return (
    <>
      <Head>
        <title>Top artists | Spotistats</title>
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
            text="Top artists"
          />
        )}
        <div className={styles.header__text}>
          <h5>Playlist</h5>
          <h1 className={styles.pageTitle}>Top artists</h1>
          <p>
            {isLoading ? (
              <Skeleton
                size={{
                  width: 200,
                  height: 14,
                }}
              />
            ) : (
              artists?.slice(0, 2).map((artist: Item, index: number) => (
                <span key={artist.id}>
                  {artist.name}
                  {index === 1 ? ' and more' : ', '}
                </span>
              ))
            )}
          </p>
          <p className={styles.header__description}>
            <span className={styles.header__username}>
              {user?.name ? user.name : <Skeleton size={{ width: 100, height: 14 }} />}
            </span>
            &nbsp; <span className={styles.dot} /> 30 artists
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
                <div>Name</div>
                <div className={styles.header__genres}>Genres</div>
                <div className={styles.header__album}>Followers</div>
              </div>
              {artists?.map((artist: Item, index: number) => (
                <div key={artist.name}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layoutId={artist.name}
                    className={styles.table__row}
                  >
                    <div className={styles.table__index}>{index + 1}</div>
                    <div>
                      <img src={artist.images[1].url} alt={artist.name} width={50} height={50} />
                    </div>
                    <div className={styles.title}>{artist.name}</div>
                    <div className={styles.table__genres}>
                      <span>
                        {artist.genres.slice(0, 3).map((genre, index) => (
                          <span key={genre}>
                            {artist.genres.length > 1
                              ? (artist.genres.length > 3 ? 3 : artist.genres.length) !== index + 1
                                ? `${genre}, `
                                : genre
                              : genre}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className={styles.table__album}>
                      {numFormatter(artist.followers.total, 1)}
                    </div>
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
              onClick={() => createPlaylist({ name, description, playlistData: artists, user })}
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
    </>
  );
}
