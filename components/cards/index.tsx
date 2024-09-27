'use client';
import { useState } from 'react';
import { Movie } from '@/types/types';
import Card from '@/components/Card';

type CardsProps = {
  movies: Movie[];
};

const Cards = ({ movies }: CardsProps) => {
  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedMovieId(id);
  };

  const handleCollapse = () => {
    setExpandedMovieId(null);
  };

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4'>
      {movies?.map((movie: Movie) => (
        <Card
          key={movie.id}
          movie={movie}
          isExpanded={expandedMovieId === movie.id}
          onExpand={handleExpand}
          onCollapse={handleCollapse}
        />
      ))}
    </div>
  );
};

export default Cards;
