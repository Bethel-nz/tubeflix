import VideoFrame from '@/components/VideoFrame/VideoFrame';
import fetchMovie from '@/lib/fetchMovie';
import { Movie } from '@/types/types';
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
  const movieData: Movie = await fetchMovie(id);

  return {
    title: movieData.title,
    description: `This is the page of ${movieData.title}`,
  };
}

export default async function Page({ params: { id } }: Params) {
  const movie: Movie = await fetchMovie(id);

  return (
    <Suspense
      fallback={
        <div className='h-screen w-screen flex items-center justify-center'>
          Loading...
        </div>
      }
    >
      <div className='h-[90dvh] w-full'>
        <VideoFrame imdb_Id={movie.id} tmdb_Id={movie.id} fallBackId={id} />
      </div>
    </Suspense>
  );
}
