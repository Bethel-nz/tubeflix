import { Pagination } from '@/components/shared/Pagination/Pagination';
import fetchMovies from '@/lib/fetchMovies';
import { Metadata } from 'next';
import { lazy, Suspense } from 'react';
const Cards = lazy(() => import('@/components/cards'));

type Props = {
  params: { page: string };
  searchParams: { page: string };
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tube-Flix - Movies',
  description: 'Movie Streaming platform - A Netfflix Clone',
};

export async function generateStaticParams() {
  const moviesData = await fetchMovies();
  const { data } = moviesData;
  const { results: movies } = data;

  return movies.map((movie) => ({
    id: movie.id,
  }));
}

export default async function Movies({ searchParams }: Props) {
  const { page } = searchParams;
  const moviesData = await fetchMovies(Number(page));
  const { data } = moviesData;
  const { results: movies } = data;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Cards movies={movies} />
      </Suspense>
      <div>
        <Pagination page={Number(page)} totalPages={500} />
      </div>
    </div>
  );
}
