'use client';
import { Movie } from '@/types/types';
import { useLocalStorage } from 'usehooks-ts';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import WatchListCard from '@/components/Card/WatchListCard';

export default function Watchlist() {
  const [movies, setMovies] = useLocalStorage<Movie[]>('favouriteMovies', []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemove = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center text-accent-dark'>
        My Watchlist
      </h1>
      {movies.length >= 1 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {movies.map((movie: Movie) => (
            <WatchListCard
              key={movie.id}
              movie={movie}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center mx-auto space-y-4 gap-y-8 text-gray-200 font-semibold text-center h-[60vh]'>
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Oops! 😢
          </h2>
          <h3 className='text-2xl sm:text-3xl md:text-4xl'>
            You haven&apos;t added any movies to your watchlist yet
          </h3>
          <div className='mt-4'>
            <Link
              href='/movies?page=1'
              className='px-8 py-2 text-xl sm:text-2xl md:text-3xl font-bold duration-200 border-4 rounded-full text-accent-dark hover:text-accent-one border-accent-dark hover:border-accent-one transition-color ease-bezier'
            >
              Discover Movies
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
