import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { opacityVariants } from '@/lib/framer';

import styles from './Backdrop.module.scss';

interface Props {
  show: boolean;
  onClick: () => void;
}

const Backdrop: FunctionComponent<Props> = ({ show, onClick }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        variants={opacityVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.backdrop}
        onClick={onClick}
      />
    )}
  </AnimatePresence>
);

export default Backdrop;
