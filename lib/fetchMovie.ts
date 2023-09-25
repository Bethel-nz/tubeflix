import { MovieData } from '@/types/types';

export default async function fetchMovie(id: string | number) {
	const res = await fetch(`/api/movies/movie/${id}`, {
		cache: 'no-store',
	});
	const movies: MovieData = await res.json();
	return movies;
}
