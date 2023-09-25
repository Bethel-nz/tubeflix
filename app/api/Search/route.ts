import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

export const GET = async (request: NextRequest) => {
	try {
		const search = request.nextUrl.searchParams.get('q');
		const reqPage = request.nextUrl.searchParams.get('page');
		const url = `https://api.themoviedb.org/3/search/movie?query=${search}&page=${reqPage}&include_adult=false`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		const response = await fetch(url, options);
		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		throw new Error(`Oops!! There was an error: \n${error}`);
	}
};
