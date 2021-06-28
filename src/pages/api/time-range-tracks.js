import { getSpotifyData } from '@/lib/http';

const periodHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { range, token } = req.body;
    const { items } = await getSpotifyData(`/me/top/tracks?time_range=${range}`, token);
    res.send(items);
  }
};

export default periodHandler;
