import { MovieData } from '@/types/types';
import { BASE_URL } from '@/constants';

const fetchMovie = async (id: number): Promise<MovieData> => {
  try {
    const response = await fetch(`${BASE_URL}/api/movies/movie/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    throw error;
  }
};

export default fetchMovie;
