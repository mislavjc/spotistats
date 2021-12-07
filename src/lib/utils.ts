// @ts-ignore
import ColorThief from 'colorthief';
import { Item } from '@/types/track-types';

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = +((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const arrToRgb = (arr: string[]) => {
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
};

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
  const msToTime = (duration: number)  => {
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return hours + ' hr ' + minutes + ' min';
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
