import { motion } from 'framer-motion';

import Skeleton from './Skeleton';

import { getFallbackTracks, getRandomArbitrary } from '@/lib/utils';
import { cardVariants } from '@/lib/framer';

import styles from '@/styles/Tracks.module.scss';

const SkeletonTable = () => {
  const tracks = getFallbackTracks();

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <div className={styles.header__index}>#</div>
        <div>&nbsp;</div>
        <div>
          <Skeleton size={{ width: 50, height: 14 }} />
        </div>
        <div className={styles.header__album}>
          <Skeleton size={{ width: 50, height: 14 }} />
        </div>
        <div>
          <Skeleton size={{ width: 14, height: 14 }} />
        </div>
      </div>
      {tracks?.map((track, index: number) => (
        <div key={index}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
            layoutId={`index-${index}`}
            className={styles.table__row}
          >
            <div className={styles.table__index}>{index + 1}</div>
            <div>
              <Skeleton size={{ width: 50, height: 50 }} />
            </div>
            <div className={styles.table__credits}>
              <span className={styles.title}>
                <Skeleton size={{ width: getRandomArbitrary(30, 70), height: 14 }} />
              </span>
              <span className={styles.artists}>
                <span>
                  <Skeleton size={{ width: getRandomArbitrary(80, 150), height: 14 }} />
                </span>
              </span>
            </div>
            <div className={styles.table__album}>
              <Skeleton size={{ width: getRandomArbitrary(20, 50), height: 14 }} />
            </div>
            <div>
              <Skeleton size={{ width: getRandomArbitrary(20, 50), height: 14 }} />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
