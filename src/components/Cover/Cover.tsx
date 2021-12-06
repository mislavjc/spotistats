import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import styles from './Cover.module.scss';

interface Props {
  cover: string;
  color: string;
  path: {
    top: string;
    bottom: string;
  };
}

const Cover: FC<Props> = ({ cover, color, path }) => (
  <div className={styles.header__image}>
    <span>
      <div className={styles.wave__top}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <motion.path
            initial={false}
            animate={{ fill: color }}
            fillOpacity="0.9"
            d={path.top}
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
            d={path.bottom}
          ></motion.path>
        </svg>
      </div>
      <motion.div className={styles.wave__cover} initial={false} animate={{ background: color }} />
      <h1 className={styles.wave__title}>Top songs</h1>
    </span>
  </div>
);

export default Cover;
