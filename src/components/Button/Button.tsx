import { FC, ReactNode } from 'react';

import styles from './Button.module.scss';

interface Props {
  children: string | ReactNode;
  color?: 'primary' | 'secondary';
  onClick: () => void;
  size?: 'sm' | 'md';
}

const Button: FC<Props> = ({ children, color = 'primary', onClick, size = 'md' }) => (
  <button onClick={onClick} className={styles[`btn__${size}_${color}`]}>
    {children}
  </button>
);

export default Button;
