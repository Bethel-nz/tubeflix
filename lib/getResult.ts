export default async function getResult(q: string, page: number = 1) {
	const res = await fetch(
		`http://127.0.0.1:3000/api/Search?q=${q}&page=${page}`,
		{
			cache: 'no-store',
		}
	);
	const movies = await res.json();
	return movies;
}
