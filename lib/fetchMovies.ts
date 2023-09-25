import { MoviesData } from '@/types/types';

export default async function fetchMovies() {
	const res = await fetch(`${window.location.origin}/api/movies`, {
		cache: 'no-store',
	});
	const movies: MoviesData = await res.json();
	return movies;
}
