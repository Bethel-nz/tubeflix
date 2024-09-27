import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const TOKEN = process.env.ACCESSTOKEN;
const TMDB_URL = process.env.TMDB_URL;

export async function GET(request: NextRequest) {
  try {
    const reqPage = request.nextUrl.searchParams.get('page') || 1;
    const url = `${TMDB_URL}/movie/popular?language=en-US&page=${reqPage}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
