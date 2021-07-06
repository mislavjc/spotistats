import { getSession } from 'next-auth/client';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { getSpotifyData } from '@/lib/http';
import { cardVariants } from '@/lib/framer';
import { getColor } from '@/lib/utils';
import styles from '@/styles/Artists.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { spring } from '@/lib/utils';

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
  const artists = {
    short_term: await getSpotifyData(
      '/me/top/artists?time_range=short_term&limit=30',
      session.user.accessToken,
    ),
    medium_term: await getSpotifyData(
      '/me/top/artists?time_range=medium_term&limit=30',
      session.user.accessToken,
    ),
    long_term: await getSpotifyData(
      '/me/top/artists?time_range=long_term&limit=30',
      session.user.accessToken,
    ),
  };
  const short_color = await getColor(artists.short_term[0].images[0].url, 2);
  const medium_color = await getColor(artists.medium_term[0].images[0].url, 2);
  const long_color = await getColor(artists.long_term[0].images[0].url, 2);
  const timeSpans = [
    { span: 'short_term', title: 'Last month', color: short_color },
    { span: 'medium_term', title: 'Last six months', color: medium_color },
    { span: 'long_term', title: 'Overall', color: long_color },
    { span: 'tracks', title: 'Tracks' },
  ];
  return {
    props: {
      artists,
      timeSpans,
    },
  };
}

export default function TopArtists({ artists, timeSpans }) {
  const router = useRouter();
  const [data, setData] = useState(artists);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(timeSpans[0]);
  const [range, setRange] = useState(timeSpans[0].span);
  const [color, setColor] = useState(timeSpans[0].color);

  const handleClick = (range, index) => {
    if (range === 'tracks') {
      router.push('/top-tracks');
    } else {
      setRange(range);
      setColor(timeSpans[index].color);
    }
  };

  return (
    <>
      <Head>
        <title>Top artists | Spotistats</title>
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
      <h1 className={styles.pageTitle}>Top artists</h1>
      <div className="container">
        <AnimateSharedLayout>
          <div className="chip-container">
            {timeSpans.map((time, index) => (
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
        <AnimateSharedLayout>
          <AnimatePresence>
            <div className={styles.table}>
              <div className={styles.table__header}>
                <div className={styles.header__index}>#</div>
                <div>&nbsp;</div>
                <div>Name</div>
                <div className={styles.header__genres}>Genres</div>
                <div className={styles.header__album}>Followers</div>
              </div>
              {data[range].map((artist, index) => (
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
                      <Image src={artist.images[1].url} alt={artist.name} width={50} height={50} />
                    </div>
                    <div className={styles.title}>{artist.name}</div>
                    <div className={styles.table__genres}>
                      <span>
                        {artist.genres.slice(0, 3).map((genre, index) => (
                          <span key={genre}>
                            {artist.genres.length > 1
                              ? (artist.genres.length > 3 ? 3 : artist.genres.length) !== index + 1
                                ? genre + ', '
                                : genre
                              : genre}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className={styles.table__album}>{artist.followers.total}</div>
                  </motion.div>
                </div>
              ))}
            </div>
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>
    </>
  );
}
