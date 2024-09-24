import { MoviesData } from '@/types/types';

export default async function fetchMovies(page: number = 1) {
  const res = await fetch(`http://localhost:3000/api/movies?page=${page}`, {
    cache: 'no-store',
  });
  const movies: MoviesData = await res.json();
  return movies;
}
