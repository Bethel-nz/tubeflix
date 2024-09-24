'use client';
import { useLocalStorage } from 'usehooks-ts';
import { Suspense, useEffect, useState, memo, useMemo, lazy } from 'react';
import { Movie, Trailer } from '@/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import CardSkeleton from '../shared/Skeleton/CardSkeleton/CardSkeleton';
import { getTrailer } from '@/lib/fetchTrailer';
const NormalCard = lazy(() => import('./NormalCard'));
const ExpandedCard = lazy(() => import('./ExpandedCard'));

type CardProps = {
  movie: Movie;
};

const Card = ({ movie }: CardProps) => {
  const [cardState, setCardState] = useState({
    isFavourited: false,
    isExpanded: false,
    trailers: undefined as Trailer[] | undefined,
  });

  const [storedFavorites, setStoredFavourites] = useLocalStorage<Movie[]>(
    'favouriteMovies',
    []
  );

  const isOnArray = useMemo(
    () => storedFavorites.some((fav: { id: number }) => fav.id === movie.id),
    [storedFavorites, movie.id]
  );

  useEffect(() => {
    if (!movie) return;
    setCardState((prev) => ({ ...prev, isFavourited: isOnArray }));
  }, [isOnArray, movie]);

  const addToFavorites = (movie: Movie) => {
    setStoredFavourites((prev) =>
      isOnArray ? prev.filter((fav) => fav.id !== movie.id) : [...prev, movie]
    );
  };

  const handleExpand = () => {
    setCardState((prev) => ({ ...prev, isExpanded: true }));
    getTrailer(movie.id, (trailers) =>
      setCardState((prev) => ({ ...prev, trailers }))
    );
  };

  const handleCollapse = () => {
    setCardState((prev) => ({ ...prev, isExpanded: false }));
  };

  return (
    <Suspense fallback={<CardSkeleton />}>
      <motion.div
        layout
        className='relative'
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
      >
        <NormalCard movie={movie} onExpand={handleExpand} />

        <AnimatePresence mode='popLayout'>
          {cardState.isExpanded && (
            <ExpandedCard
              movie={movie}
              trailers={cardState.trailers}
              isFavourited={cardState.isFavourited}
              onCollapse={handleCollapse}
              onAddToFavorites={() => addToFavorites(movie)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Suspense>
  );
};

export default memo(Card);
