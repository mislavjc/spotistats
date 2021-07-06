import ColorThief from 'colorthief';

export const millisToMinutesAndSeconds = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const arrToRgb = arr => {
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
};

export const getColor = async url => {
  const color = await ColorThief.getPalette(url, 2);
  return arrToRgb(color[1]);
};

export const numFormatter = (num, digits) => {
  const si = { value: 1e3, symbol: 'k' };
  if (num >= si.value) {
    return (num / si.value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si.symbol;
  }
  return num.toString();
};