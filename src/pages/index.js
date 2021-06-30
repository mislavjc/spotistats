import Link from 'next/link';
import styles from '@/styles/Landing.module.scss';

export default function Home() {
  return (
    <div className={styles.landingPage}>
      <div>
        <h1>Get your statics</h1>
        <p>Pick up your music right where you left off.</p>
        <Link href="/top-tracks" passHref>
          <button className="btn">START USING</button>
        </Link>
      </div>
    </div>
  );
}
