import { MoviesDataResponse } from '@/types/types';
import { BASE_URL } from '@/constants';

export default async function fetchMovies(page: number = 1) {
  const res = await fetch(`BASE_URL}/api/movies?page=${page}`, {
    cache: 'no-store',
  });
  const movies: MoviesDataResponse = await res.json();
  return movies;
}
