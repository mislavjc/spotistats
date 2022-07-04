import type { NextApiRequest, NextApiResponse } from 'next';

import { getColor } from '@/lib/utils';
import { getSpotifyData } from '@/lib/http';
import { Artists } from '@/types/artist-types';

type Data = {
  artists: Artists;
  color: string;
  cover: string;
};

const getArtistsHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const { span, token } = req.query;

    const artists = await getSpotifyData(`/me/top/artists?time_range=${span}&limit=30`, token!);
    const color = await getColor(artists[0].images[0].url);
    const cover = artists[0].images[1].url;

    res.send({ artists, color, cover });
  }
};

export default getArtistsHandler;
