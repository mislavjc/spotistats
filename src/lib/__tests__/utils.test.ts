import {
  arrToRgb,
  featuredArtists,
  getFallbackTracks,
  getRandomArbitrary,
  getTotalLenght,
  millisToMinutesAndSeconds,
  numFormatter,
} from '../utils';

it('should return minutes and seconds', () => {
  const trackLenght = millisToMinutesAndSeconds(1000);

  expect(trackLenght).toEqual('0:01');
});

it('should return a valid rgb string', () => {
  const color = ['255', '255', '255'];
  const rgb = arrToRgb(color);

  expect(rgb).toEqual('rgb(255, 255, 255)');
});

it('should return a formatted number as a string', () => {
  const num = 1_000_000;
  const formatted = numFormatter(num, 1);

  expect(formatted).toEqual('1M');
});

it('should return a total lengt of tracks', () => {
  const tracks: any = [
    { duration_ms: 100_000 },
    { duration_ms: 200_000 },
    { duration_ms: 300_000 },
  ];
  const totalLenght = getTotalLenght(tracks);

  expect(totalLenght).toEqual('0 hr 10 min');
});

it('should return two featured artists', () => {
  const tracks: any = [
    { artists: [{ name: 'artist1' }] },
    { artists: [{ name: 'artist2' }] },
    { artists: [{ name: 'artist1' }] },
  ];
  const featured = featuredArtists(tracks);

  expect(featured).toEqual(['artist1', 'artist2']);
});

it('should return a random number between two numbers', () => {
  const min = 1;
  const max = 10;
  const random = getRandomArbitrary(min, max);

  expect(random).toBeGreaterThanOrEqual(min);
  expect(random).toBeLessThanOrEqual(max);
});

it('should return 30 fallback tracks', () => {
  const fallback = getFallbackTracks();

  expect(fallback).toHaveLength(30);
});
