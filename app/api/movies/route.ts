import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const TOKEN = process.env.ACCESSTOKEN;

export async function GET(request: NextRequest) {
  try {
    const reqPage = request.nextUrl.searchParams.get('page') || 1;
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
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch popular movies' },
      { status: 500 }
    );
  }
}
