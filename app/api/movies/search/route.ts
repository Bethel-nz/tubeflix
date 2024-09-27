import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const TOKEN = process.env.ACCESSTOKEN;
const TMDB_URL = process.env.NEXT_PUBLIC_TMDB_URL;

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q');
    const reqPage = request.nextUrl.searchParams.get('page');
    const url = `${TMDB_URL}/search/movie?query=${query}&page=${reqPage}&include_adult=false`;
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
}
