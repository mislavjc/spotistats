import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'user-top-read user-library-read playlist-modify-private user-read-private',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile && account) {
        console.log('account', account);
        token.id = profile.id;
        token.accessToken = account.access_token;
      }

      return token;
    },
    // @ts-ignore
    session: async ({ token, session }) =>
      Promise.resolve({
        user: token,
        expires: new Date(Date.now() + 1000 * 60 * 30),
      }),
  },
  secret: process.env.SECRET,
  session: {
    maxAge: 3000,
  },
});
