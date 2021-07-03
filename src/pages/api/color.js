import { getColor } from '@/lib/utils';

const colorHandler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const palette = await getColor(data[0].album.images[0].url, 2);
    res.send(palette);
  }
};

export default colorHandler;
