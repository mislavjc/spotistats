import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

import { TimeSpans, User } from '@/types';
import { Item } from '@/types/track-types';

interface CreatePlaylistProps {
  name: string;
  description: string;
  user: User;
  playlistData: Item[];
}

const apiUrlMap = {
  tracks: '/api/create-playlist',
  artists: '/api/create-artist-playlist',
};

const apiUrlArr = Object.keys(apiUrlMap);

type ApiEnum = keyof typeof apiUrlMap;

export const usePlaylist = (postUrl: ApiEnum) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [error, setError] = useState(false);

  const createPlaylist = async ({ name, description, user, playlistData }: CreatePlaylistProps) => {
    if (name) {
      axios
        .post(apiUrlMap[postUrl], {
          id: user?.id,
          token: user?.accessToken,
          playlistData,
          name,
          description,
        })
        .then(res => {
          setOpen(true);
          setShowForm(false);
          setPlaylistTitle(name);
          setName('');
          setDescription('');
          setUrl(res.data);
        });
    } else {
      setError(true);
    }
  };

  const backdropHandler = () => {
    setShowForm(false);
    setOpen(false);
  };

  return {
    createPlaylist,
    backdropHandler,
    error,
    name,
    setName,
    description,
    setDescription,
    open,
    showForm,
    setShowForm,
    playlistTitle,
    url,
  };
};

export const useRange = (type: ApiEnum, timeSpans: TimeSpans) => {
  const router = useRouter();

  const [selected, setSelected] = useState(timeSpans[0]);
  const [pathTop, setPathTop] = useState(timeSpans[0].pathTop);
  const [pathBottom, setPathBottom] = useState(timeSpans[0].pathBottom);
  const [range, setRange] = useState(timeSpans[0].span);

  const handleClick = (range: string, index: number) => {
    if (range === apiUrlArr.filter(url => url !== type)[0]) {
      router.push(`/top-${range}`);
      return;
    }
    setRange(range);
    setPathTop(timeSpans[index].pathTop);
    setPathBottom(timeSpans[index].pathBottom);
  };

  return {
    selected,
    setSelected,
    pathTop,
    pathBottom,
    range,
    handleClick,
  };
};
