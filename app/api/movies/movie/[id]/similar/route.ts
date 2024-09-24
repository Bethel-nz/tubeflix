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
    // Fetch the movie details to get the genre IDs
    const movieResponse = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const movieData = await movieResponse.json();
    const genreIds = movieData.genres
      .map((genre: { id: number }) => genre.id)
      .join(',');

    // Fetch similar movies based on genre IDs
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&language=en-US&page=1`
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
