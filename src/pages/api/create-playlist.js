import { postSpotifyData } from '@/lib/http';

const createPlaylistHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { id, token, data, name, description } = req.body;
    const playlistInfo = {
      name,
      description,
      public: false,
    };
    const response = await postSpotifyData(`/users/${id}/playlists`, token, playlistInfo);
    const link = response.external_urls.spotify;
    const playlistUri = response.uri.replace('spotify:playlist:', '');
    const uris = [];
    for (const track of data) {
      uris.push(track.uri);
    }
    await postSpotifyData(`/playlists/${playlistUri}/tracks`, token, uris);
    res.send(link);
  }
};

export default createPlaylistHandler;
