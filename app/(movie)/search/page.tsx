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
    <div className='pt-20'>
      {!q ? (
        <div>
          <p className='text-2xl text-white text-center mb-8'>Search A Movie</p>
        </div>
      ) : (
        <>
          <Cards movies={result} />
        </>
      )}
      <div>
        <Pagination
          page={Number(page) || 1}
          totalPages={moviesData.total_pages}
        />
      </div>
    </div>
  );
}
