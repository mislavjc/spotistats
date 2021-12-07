// @ts-ignore
import ColorThief from 'colorthief';
import { Item } from '@/types/track-types';

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = +((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const arrToRgb = (arr: string[]) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

export const getColor = async (url: string) => {
  const color = await ColorThief.getPalette(url, 2);
  return arrToRgb(color[1]);
};

export const numFormatter = (num: number, digits: number) => {
  const si = [
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      );
    }
  }
  return num.toString();
};

export const getTotalLenght = (arr: Item[]) => {
  let totalLenght = 0;
  arr.map(track => {
    totalLenght += track.duration_ms;
  });
  const msToTime = (duration: number) => {
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return `${hours} hr ${minutes} min`;
  };
  return msToTime(totalLenght);
};

export const featuredArtists = (arr: Item[]) => {
  const firstArtist = arr[0].artists[0].name;
  let secondArtist = arr[1].artists[0].name;
  let i = 2;
  while (firstArtist === secondArtist) {
    secondArtist = arr[i].artists[0].name;
    i++;
  }
  return [firstArtist, secondArtist];
};

export const getRandomArbitrary = (min: number, max: number) => Math.random() * (max - min) + min;

export const getFallbackTracks = () => {
  const fallback = [];
  for (let i = 0; i < 30; i++) {
    fallback.push(i);
  }
  return fallback;
};

export const getTimeSpans = (type: 'artists' | 'tracks') => [
  {
    span: 'short_term',
    title: 'Last month',
    pathTop:
      'M0,288L48,240C96,192,192,96,288,64C384,32,480,64,576,69.3C672,75,768,53,864,48C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,0L48,16C96,32,192,64,288,96C384,128,480,160,576,149.3C672,139,768,85,864,80C960,75,1056,117,1152,117.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    span: 'medium_term',
    title: 'Last six months',
    pathTop:
      'M0,64L48,64C96,64,192,64,288,85.3C384,107,480,149,576,176C672,203,768,213,864,208C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,64L48,85.3C96,107,192,149,288,144C384,139,480,85,576,90.7C672,96,768,160,864,170.7C960,181,1056,139,1152,149.3C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    span: 'long_term',
    title: 'Overall',
    pathTop:
      'M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,106.7C672,96,768,128,864,165.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,64L48,101.3C96,139,192,213,288,208C384,203,480,117,576,80C672,43,768,53,864,48C960,43,1056,21,1152,32C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    span: type,
    title: type,
    pathTop:
      'M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,106.7C672,96,768,128,864,165.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    pathBottom:
      'M0,64L48,101.3C96,139,192,213,288,208C384,203,480,117,576,80C672,43,768,53,864,48C960,43,1056,21,1152,32C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
];
