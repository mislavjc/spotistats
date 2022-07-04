import { getTimeSpans } from '@/lib/utils';

export type TimeSpans = ReturnType<typeof getTimeSpans>;

export interface User {
  id: string | null;
  name: string | null;
  picture: string | null;
  exp: number;
  iat: number;
  jti: number | null;
  sub: string | null;
  accessToken: string | null;
}