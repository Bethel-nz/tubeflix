import { Pagination } from '@/components/shared/Pagination/Pagination';
import getResult from '@/lib/getResult';
import { Metadata } from 'next';
import { lazy } from 'react';
const Cards = lazy(() => import('@/components/cards'));

type Props = {
  searchParams: {
    page: number;
    q: string;
  };
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tube-Flix Search Page',
  description: 'Movie Streaming platform - A Netflix Clone',
};

export default async function Movies({ searchParams }: Props) {
  const { q, page } = searchParams;
  const moviesData = await getResult(q, page);
  const { results: result } = moviesData;

  return (
    <div className='mt-4'>
      {!q ? (
        <div>
          <p className='text-2xl text-white text-center mb-8'>Search A Movie</p>
        </div>
      ) : q && result.length === 0 ? (
        <div>
          <p className='text-2xl text-white text-center mb-8'>
            No results found
          </p>
        </div>
      ) : q && result.length > 0 ? (
        <div>
          <h3 className='text-2xl text-white text-center mb-4'>
            Showing results for:{' '}
            <span className='underline font-bold'>{q}</span>
          </h3>
          <div>
            <Cards movies={result} />
          </div>
        </div>
      ) : null}
      <div>
        {q && (
          <Pagination
            page={Number(page) || 1}
            totalPages={moviesData.total_pages}
          />
        )}
      </div>
    </div>
  );
}
