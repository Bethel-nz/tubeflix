import { NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY;

type Params = {
  params: {
    id: string;
  };
};
export async function GET(request: Request, { params: { id } }: Params) {
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
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
}
