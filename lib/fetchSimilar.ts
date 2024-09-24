export const fetchSimilarMovies = async (id: string) => {
  try {
    const response = await fetch(`/api/movies/movie/${id}/similar`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch similar movies:', error);
  }
};
