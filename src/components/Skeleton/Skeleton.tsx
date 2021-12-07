import { FC } from 'react';

import styles from './Skeleton.module.scss';

interface Props {
  size?: {
    width: number;
    height: number;
  };
  autoSize?: boolean;
}

const Skeleton: FC<Props> = ({ size, autoSize = false }) => (
  <div
    className={`${styles.skeleton} ${autoSize ? styles.autoSize : ''}`}
    style={{ width: size?.width, height: size?.height }}
  />
);

export default Skeleton;
