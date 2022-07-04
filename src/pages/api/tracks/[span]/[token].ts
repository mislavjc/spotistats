import type { NextApiRequest, NextApiResponse } from 'next';

import { getColor } from '@/lib/utils';
import { getSpotifyData, getArtistData } from '@/lib/http';
import { Tracks } from '@/types/track-types';

type Data = {
  tracks: Tracks;
  color: string;
  cover: string;
};

const getTracksHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const { span, token } = req.query;

    const tracks = await getSpotifyData(`/me/top/tracks?time_range=${span}&limit=30`, token!);
    const color = await getColor(tracks[0].album.images[0].url);
    const artist = await getArtistData(tracks[0].artists[0].id, token!);
    const cover = artist.images[1].url;

    res.send({ tracks, color, cover });
  }
};

export default getTracksHandler;
