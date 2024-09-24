import { BASE_URL } from '@/constants';

import { MovieData } from '@/types/types';

export const fetchSimilarMovies = async (
  id: number,
  callback: (movies: MovieData[] | undefined) => void
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/movies/movie/${id}/similar`);
    const data = await response.json();
    callback(data.similarMovies); // Ensure the callback receives the correct data
  } catch (error) {
    console.error('Failed to fetch similar movies:', error);
    callback(undefined); // Ensure the callback is called with undefined on error
  }
};
