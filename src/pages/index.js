import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="landing-page">
      <div>
        <h1>Get your statics</h1>
        <p>Pick up your music right where you left off.</p>
        <Link href="/top-tracks" passHref>
          <button className="btn-outlined">START USING</button>
        </Link>
      </div>
    </div>
  );
}
