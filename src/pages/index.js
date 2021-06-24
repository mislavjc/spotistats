import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Button variant="outlined" color="primary">
        <Link href="top-tracks">Tracks</Link>
      </Button>
    </Container>
  );
}
