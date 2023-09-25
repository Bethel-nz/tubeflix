import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const TOKEN = process.env.ACCESSTOKEN;

export const GET = async (request: NextRequest) => {
	try {
		const reqPage = request.nextUrl.searchParams.get('page');
		const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${reqPage}`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		const response = await fetch(url, options);
		const data = await response.json();
		// console.log(data);
		return NextResponse.json({ data });
	} catch (error) {
		throw new Error(`Oops!! There was an error: \n${error}`);
	}
};
