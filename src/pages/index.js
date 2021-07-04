import Link from 'next/link';
import styles from '@/styles/Landing.module.scss';

export default function Home() {
  return (
    <div className={styles.landingPage}>
      <div>
        <h1>Get your statics</h1>
        <p>See what tracks were your most listened.</p>
        <Link href="/top-tracks" passHref>
          <button className="btn">START USING</button>
        </Link>
      </div>
    </div>
  );
}
