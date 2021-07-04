import styles from '@/styles/Landing.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className={styles.landingPage}>
        <div>
          <h1>Get your statistics</h1>
          <p>See what tracks were your most listened.</p>
          <Link href="/top-tracks" passHref>
            <button className="btn">START USING</button>
          </Link>
        </div>
      </div>
      <div className={styles.about}>
        <div>
          <h2>Statify features</h2>
          <div className={styles.features}>
            <div>
              <div className={styles.icon}>
                <Image src="/icons/music_note.svg" alt="music note" width={100} height={100} />
              </div>
              <div>
                <h2>Most listened tracks.</h2>
                <p>See the tracks you&apos;ve listened the most.</p>
              </div>
            </div>
            <div>
              <div className={styles.icon}>
                <Image src="/icons/date_range.svg" alt="music note" width={100} height={100} />
              </div>
              <div>
                <h2>Browse by period.</h2>
                <p>Choose the time span for your listening habbits.</p>
              </div>
            </div>
            <div>
              <div className={styles.icon}>
                <Image src="/icons/library_add.svg" alt="music note" width={100} height={100} />
              </div>
              <div>
                <h2>Hassle-free playlist creation.</h2>
                <p>Save your favourites to your library.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
