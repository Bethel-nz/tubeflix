import { Movie } from '@/types/types';

const fetchMovie = async (id: number): Promise<Movie> => {
  try {
    const response = await fetch(`https://${process.env.VERCEL_URL}/api/movies/movie/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    throw error;
  }
};

export default fetchMovie;
