import { TimeSpan } from '@/types/shared-types';

export interface ArtistProps {
  artists: Artists;
  timeSpans: TimeSpan[];
  token: string;
  id: string;
  username: string;
}

export interface Artists {
  short_term: Item[];
  medium_term: Item[];
  long_term: Item[];
  [key: string]: Item[];
}

export interface Data {
  items: Item[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: null;
  next: string;
}

export interface Item {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}
