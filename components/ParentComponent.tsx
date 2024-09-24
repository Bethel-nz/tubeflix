import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MovieData } from '@/types/types';
import Card from './card';

type ParentComponentProps = {
  movies: MovieData[];
};

const ParentComponent = ({ movies }: ParentComponentProps) => {
  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const modal = searchParams.get('modal');
    const id = searchParams.get('id');
    if (modal === 'open' && id) {
      setExpandedMovieId(parseInt(id));
    } else {
      setExpandedMovieId(null);
    }
  }, [searchParams]);

  const handleExpand = (id: number) => {
    setExpandedMovieId(id);
    router.push(`?modal=open&id=${id}`);
  };

  const handleCollapse = () => {
    router.push(`?modal=close`);
  };

  return (
    <div>
      {movies.map((movie) => (
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

export default ParentComponent;
