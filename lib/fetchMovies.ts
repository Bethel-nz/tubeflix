import { MoviesData } from '@/types/types';
import { BASE_URL } from '@/constants/constants';

export default async function fetchMovies(page: number = 1) {
	const res = await fetch(
		`https://${process.env.VERCEL_URL}/api/movies?page=${page}`,
		{
			cache: 'no-store',
		}
	);
	const movies: MoviesData = await res.json();
	return movies;
}
