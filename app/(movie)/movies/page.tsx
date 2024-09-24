import { Pagination } from '@/components/shared/Pagination/Pagination';
import fetchMovies from '@/lib/fetchMovies';
import { Movie } from '@/types/types';
import { Metadata } from 'next';
import { lazy } from 'react';
const Card = lazy(() => import('@/components/Card/Card'));

type Props = {
  params?: string;
  searchParams: {
    page: number;
  };
};

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
  const moviesData = await fetchMovies(page);
  const { data } = moviesData;
  const { results: movies } = data;

  return (
    <div>
      <div className='grid grid-cols-3 xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-8 gap-x-3 h-full place-items-center'>
        {movies?.map((movie: Movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
      <div>
        <Pagination
          page={Number(page) || 1}
          totalPages={500}
          maxPageLinks={8}
        />
      </div>
    </div>
  );
}
