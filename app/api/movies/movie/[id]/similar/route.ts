import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const API_KEY = process.env.API_KEY;
const TOKEN = process.env.ACCESSTOKEN;
const TMDB_URL = process.env.NEXT_PUBLIC_TMDB_URL;

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
    // Fetch the movie details to get the genre IDs
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    const movieResponse = await fetch(url, options);
    const movieData = await movieResponse.json();
    const genreIds = movieData.genres
      .map((genre: { id: number }) => genre.id)
      .join(',');

    // Fetch similar movies based on genre IDs
    const response = await fetch(
      `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&language=en-US&page=1`
    );
    const data = await response.json();
    const similarMovies = data.results.slice(0, 9);
    return NextResponse.json({ similarMovies }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch similar movies' },
      { status: 500 }
    );
  }
}
