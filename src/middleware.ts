/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedUrl = ['/top-artists', '/top-tracks'];

const isProtectedUrl = (url: string) => protectedUrl.includes(url);

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.SECRET });

  if (!session && isProtectedUrl(req.nextUrl.pathname))
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl.origin));
};

export const config = {
  matcher: protectedUrl,
};
