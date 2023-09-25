import { MoviesData } from '@/types/types';

export default async function fetchMovies() {
	const res = await fetch(`http://localhost:3000/api/movies`, {
		cache: 'no-store',
	});
	const movies: MoviesData = await res.json();
	return movies;
}
