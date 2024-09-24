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
    return NextResponse.json({ error: 'Movie ID is required' });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    console.log(data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch similar movies' },
      { status: 500 }
    );
  }
}
