import { Trailer } from '@/types/types';
import { NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY;
const TMDB_URL = process.env.NEXT_PUBLIC_TMDB_URL;

export const dynamic = 'force-dynamic';
const TOKEN = process.env.ACCESSTOKEN;

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params: { id } }: Params) {
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid movie ID' }, { status: 500 });
  }

  try {
    const url = `${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const trailer: Trailer[] = await data.results;
    return NextResponse.json(trailer, { status: 200 });
  } catch (error) {
    console.error('Error fetching trailer:', error);
    NextResponse.json({ error: 'Failed to fetch trailer' }, { status: 500 });
  }
}
