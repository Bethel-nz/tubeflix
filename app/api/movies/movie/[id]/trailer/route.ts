import { Trailer } from '@/types/types';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.API_KEY;

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
    const response = await fetch(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();
    const trailer: Trailer[] = await data.results;
    return NextResponse.json(trailer, { status: 200 });
  } catch (error) {
    console.error('Error fetching trailer:', error);
    NextResponse.json({ error: 'Failed to fetch trailer' }, { status: 500 });
  }
}
