import { BASE_URL } from '@/constants/constants';
export default async function getResult(q: string, page: number = 1) {
	const res = await fetch(`${BASE_URL}/api/Search?q=${q}&page=${page}`, {
		cache: 'no-store',
	});
	const movies = await res.json();
	return movies;
}
