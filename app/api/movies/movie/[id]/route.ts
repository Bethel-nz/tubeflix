import { NextResponse } from 'next/server';

const API_KEY = process.env.APIKEY;

type Params = {
	params: {
		id: string;
	};
};

export const GET = async (request: Request, { params: { id } }: Params) => {
	try {
		const url = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=${API_KEY}`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
		};
		const response = await fetch(url, options);
		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		throw new Error(`Oops!! There was an error: \n${error}`);
	}
};
