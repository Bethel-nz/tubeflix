'use client';
import { useState } from 'react';
import { MovieData } from '@/types/types';
import Card from '../card';

type ParentComponentProps = {
  movies: Partial<MovieData>[];
};

const ParentComponent = ({ movies }: ParentComponentProps) => {
  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedMovieId(id);
  };

  const handleCollapse = () => {
    setExpandedMovieId(null);
  };

  return (
    <div className='grid grid-cols-3 xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-8 gap-x-3 h-full place-items-center'>
      {movies?.map((movie) => (
        <Card
          key={movie.id}
          movie={movie as MovieData}
          isExpanded={expandedMovieId === movie.id}
          onExpand={handleExpand}
          onCollapse={handleCollapse}
        />
      ))}
    </div>
  );
};

export default ParentComponent;
