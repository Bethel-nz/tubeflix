'use client';

import { Movie } from '@/types/types';
import { useLocalStorage } from 'usehooks-ts';
import Cards from '@/components/cards';
import { Suspense } from 'react';

export default function Watchlist() {
  const [movies] = useLocalStorage<Movie[]>('favouriteMovies', []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-center mb-8 text-gray-200'>
          Your Watchlist
        </h1>
        <Cards movies={movies} />
      </div>
    </Suspense>
  );
}
