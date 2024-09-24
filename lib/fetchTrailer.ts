import { BASE_URL } from '@/constants';
import { Trailer } from '@/types/types';

export const getTrailer = async (
  id: number,
  callback: (trailers: Trailer[] | undefined) => void
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/api/movies/movie/${id}/trailer`);
    if (!response.ok) {
      throw new Error('Failed to fetch trailer');
    }
    const data: Trailer[] = await response.json();
    const trailers = data.filter(
      (trailer: Trailer) => trailer.site === 'YouTube'
    );

    callback(trailers);
  } catch (error) {
    console.error('Error fetching trailer:', error);
    callback(undefined);
  }
};
