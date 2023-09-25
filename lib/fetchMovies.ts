import { MoviesData } from '@/types/types';

export default async function fetchMovies() {
	const res = await fetch(`https://${process.env.VERCEL_URL}/api/movies`, {
		cache: 'no-store',
	});
	const movies: MoviesData = await res.json();
	return movies;
}
