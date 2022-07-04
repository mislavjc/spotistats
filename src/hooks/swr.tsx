import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useStore } from '@/lib/store';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json());

interface User {
  name: string;
  picture: string;
  sub: string;
  id: string;
  accessToken: string;
  expires: number;
  iat: number;
  jti: string;
}

export const useUser = () => {
  const { data, status } = useSession({
    required: true,
  });

  return {
    user: data?.user as User,
    isAuthenticating: status === 'loading',
  };
};

export const useTracks = (url: string | null) => {
  const { data, error } = useSWR(url ? `/api/tracks/${url}` : null, fetcher);

  return {
    tracks: data?.tracks,
    color: data?.color,
    cover: data?.cover,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useArtists = (url: string | null) => {
  const { data, error } = useSWR(url ? `/api/artists/${url}` : null, fetcher);

  return {
    artists: data?.artists,
    color: data?.color,
    cover: data?.cover,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useStoreUser = () => {
  const { user: authUser } = useUser();
  const [user, setUser] = useStore.user();

  useEffect(() => {
    if (typeof window !== 'undefined' && authUser) {
      // @ts-ignore
      setUser(authUser);
    }
  }, [authUser]);

  return user;
};
