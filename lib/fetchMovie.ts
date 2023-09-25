import { MovieData } from '@/types/types';

export default async function fetchMovie(id: string | number) {
	const res = await fetch(`http://localhost:3000/api/movies/movie/${id}`, {
		cache: 'no-store',
	});
	const movies: MovieData = await res.json();
	return movies;
}
