import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

import { spring } from '@/lib/framer';

import styles from './Chip.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  selected: boolean;
  layoutId?: string;
  spaced?: boolean;
}

const Chip: FC<Props> = ({ children, onClick, selected, layoutId = 'chip', spaced = false }) => (
  <button className={`${styles.chip} ${spaced ? styles.spaced : ''}`} onClick={onClick}>
    {children}
    {selected && (
      <motion.div
        layoutId={layoutId}
        className={`${styles.border__green} ${styles.background__green}`}
        initial={false}
        transition={spring}
      />
    )}
  </button>
);

export default Chip;
