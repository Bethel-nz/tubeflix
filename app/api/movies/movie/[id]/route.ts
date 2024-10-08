import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const TOKEN = process.env.ACCESSTOKEN;
const API_KEY = process.env.API_KEY;
const TMDB_URL = process.env.NEXT_PUBLIC_TMDB_URL;

type Params = {
  params: {
    id: string;
  };
};
export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const url = `${TMDB_URL}/movie/${id}?&append_to_response=videos&api_key=${API_KEY}`;
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
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
}
