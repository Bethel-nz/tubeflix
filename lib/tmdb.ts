export async function fetchSimilarMovies(movieId: string) {
  const url = ``;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}
