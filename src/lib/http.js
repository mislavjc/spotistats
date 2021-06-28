import axios from 'axios';

export const getSpotifyData = async (url, token) => {
  const response = await axios.get(`https://api.spotify.com/v1${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postSpotifyData = async (url, token, data) => {
  const response = await axios.post(`https://api.spotify.com/v1${url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
