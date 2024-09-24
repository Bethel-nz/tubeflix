import { MoviesDataResponse } from '@/types/types';

export default async function fetchMovies(page: number = 1) {
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/movies?page=${page}`, {
    cache: 'no-store',
  });
  const movies: MoviesDataResponse = await res.json();
  return movies;
}
