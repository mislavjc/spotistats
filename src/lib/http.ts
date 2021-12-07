import axios from 'axios';

export const getSpotifyData = async (url: string, token: string | string[]) => {
  const { data } = await axios.get(`https://api.spotify.com/v1${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (url === '/me') {
    return data;
  }
  return data.items;
};

export const postSpotifyData = async (url: string, token: string, data: object) => {
  const { data: res } = await axios.post(`https://api.spotify.com/v1${url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getArtistData = async (id: string | undefined, token: string | string[]) => {
  const { data: res } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getArtistTopTracks = async (
  id: string,
  country: string,
  token: string,
  amount: number,
) => {
  const { data: res } = await axios.get(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${country}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.tracks.slice(0, amount);
};
