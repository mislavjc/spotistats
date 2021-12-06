import { FC, ReactNode } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { opacityVariants } from '@/lib/framer';

import styles from './Modal.module.scss';

interface Props {
  children: ReactNode;
  show: boolean;
  className?: string;
  background?: 'light' | 'dark';
  padded?: boolean;
  rounded?: boolean;
}

const Modal: FC<Props> = ({
  children,
  show,
  background = 'dark',
  className,
  padded = false,
  rounded = false,
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        variants={opacityVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`${styles.modal} ${className} ${styles[background]} ${
          padded ? styles.padded : undefined
        } ${rounded ? styles.rounded : undefined}`}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
