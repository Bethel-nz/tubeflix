import { Pagination } from '@/components/shared/Pagination/Pagination';
import getResult from '@/lib/getResult';
import { Movie } from '@/types/types';
import { Metadata } from 'next';
import Card from '@/components/Card/Card';

type Props = {
  searchParams: {
    page: number;
    q: string;
  };
};

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
      {' '}
      {/* Adjust the padding as needed */}
      {!q ? (
        <div>
          <p className='text-2xl text-white text-center mb-8'>Search A Movie</p>
        </div>
      ) : (
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {result?.map((movie: Movie) => (
            <div key={movie.id}>
              <Card movie={movie} />
            </div>
          ))}
        </div>
      )}
      <div>
        <Pagination
          page={Number(page) || 1}
          totalPages={moviesData.total_pages}
          maxPageLinks={8}
        />
      </div>
    </div>
  );
}
