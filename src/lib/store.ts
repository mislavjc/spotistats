import createStore from 'teaful';

import { User } from '@/types';


const initialStore = {
  user: {
    id: null,
    name: null,
    picture: null,
    exp: 0,
    iat: 0,
    jti: null,
    sub: null,
    accessToken: null,
  } as User,
};
export const { useStore, getStore } = createStore(initialStore);
