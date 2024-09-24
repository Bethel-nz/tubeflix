import VideoFrame from '@/components/VideoFrame/VideoFrame';
import fetchMovie from '@/lib/fetchMovie';
import { MovieData } from '@/types/types';
import type { Metadata } from 'next';
import { Suspense } from 'react';

type Params = {
  params: {
    id: number;
  };
};

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const movieData: MovieData = await fetchMovie(id);

  return {
    title: movieData.title,
    description: `This is the page of ${movieData.title}`,
  };
}

export default async function Page({ params: { id } }: Params) {
  const movie: MovieData = await fetchMovie(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className=' mx-auto relative h-full w-[75dvw] md:w-[90dvw]'>
        <div className='flex flex-wrap items-start space-y-4 lg:space-y-0 gap-x-4'>
          <div className='relative w-full'>
            <div className='w-full h-0 pb-[56.25%] rounded-md shadow-md'>
              <VideoFrame imdb_Id={movie.id} tmdb_Id={movie.id} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
