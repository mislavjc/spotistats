import createStore from 'teaful';

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
  },
};
export const { useStore, getStore } = createStore(initialStore);
