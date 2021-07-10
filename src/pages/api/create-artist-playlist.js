import { postSpotifyData, getSpotifyData, getArtistTopTracks } from '@/lib/http';

const createArtistPlaylistHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { id, token, playlistData, name, description } = req.body;
    const user = await getSpotifyData('/me', token);
    const country = user.country;
    const uris = [];
    for (const artist of playlistData) {
      const tracks = await getArtistTopTracks(artist.id, country, token, 3);
      for (const track of tracks) {
        uris.push(track.uri);
      }
    }
    const playlistInfo = {
      name,
      description,
      public: false,
    };
    const response = await postSpotifyData(`/users/${id}/playlists`, token, playlistInfo);
    const link = response.external_urls.spotify;
    const playlistUri = response.uri.replace('spotify:playlist:', '');
    await postSpotifyData(`/playlists/${playlistUri}/tracks`, token, uris);
    res.send(link);
  }
};

export default createArtistPlaylistHandler;
