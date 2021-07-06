import axios from 'axios';

export const getSpotifyData = async (url, token) => {
  const { data } = await axios.get(`https://api.spotify.com/v1${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.items;
};

export const postSpotifyData = async (url, token, data) => {
  const { data: res } = await axios.post(`https://api.spotify.com/v1${url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
