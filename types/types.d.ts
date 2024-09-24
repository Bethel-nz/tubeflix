import { AnchorHTMLAttributes, ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
};

export type ButtonLinkProp = Props & {
  path: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type Movie = {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
};

export type Trailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Cardtype = {
  movie: Movie;
};

export interface MoviesDataResponse {
  page: number;
  data: {
    results: Movie[];
  };
  total_pages: number;
  total_results: number;
}

export type MovieData = {
  data: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
};
