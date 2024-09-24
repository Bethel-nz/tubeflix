'use client';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState, memo, useMemo, useCallback, lazy } from 'react';
import { Movie, Trailer } from '@/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrailer } from '@/lib/fetchTrailer';
import { fetchSimilarMovies } from '@/lib/fetchSimilar';
import { useSearchParams } from 'next/navigation';
const NormalCard = lazy(() => import('./NormalCard'));
const ExpandedCard = lazy(() => import('./ExpandedCard'));

type CardProps = {
  movie: Movie;
  isExpanded: boolean;
  onExpand: (id: number) => void;
  onCollapse: () => void;
};

const Card = ({ movie, isExpanded, onExpand, onCollapse }: CardProps) => {
  const params = useSearchParams();
  const [cardState, setCardState] = useState({
    isFavourited: false,
    trailers: undefined as Trailer[] | undefined,
    similarMovies: undefined as Movie[] | undefined,
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

  useEffect(() => {
    if (isExpanded) {
      fetchSimilarMovies(movie.id!, (similarMovies) => {
        setCardState((prev) => ({ ...prev, similarMovies }));
      });

      getTrailer(movie.id!, (trailers) =>
        setCardState((prev) => ({ ...prev, trailers }))
      );
    }
  }, [isExpanded, movie.id]);

  useEffect(() => {
    const handlePopState = () => {
      const modal = params.get('modal');
      const id = params.get('id');
      if (modal === 'open' && id) {
        onExpand(parseInt(id));
      } else {
        onCollapse();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onExpand, onCollapse, params]);

  const addToFavorites = useCallback(
    (movie: Movie) => {
      setStoredFavourites((prev) =>
        isOnArray ? prev.filter((fav) => fav.id !== movie.id) : [...prev, movie]
      );
    },
    [isOnArray, setStoredFavourites]
  );

  const handleExpand = useCallback(
    (id: number) => {
      const url = new URL(window.location.href);
      url.searchParams.set('modal', 'open');
      url.searchParams.set('id', id.toString());
      window.history.pushState({}, '', url.toString());
      onExpand(id);
    },
    [onExpand]
  );

  return (
    <motion.div
      layout
      className='relative'
      initial={{ opacity: 0.95 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      <NormalCard movie={movie} onExpand={() => handleExpand(movie.id!)} />

      <AnimatePresence mode='popLayout'>
        {isExpanded && (
          <ExpandedCard
            movie={movie as Movie}
            trailers={cardState.trailers}
            isFavourited={cardState.isFavourited}
            onCollapse={onCollapse}
            onAddToFavorites={() => addToFavorites(movie)}
            similarMovies={cardState.similarMovies || []} // Ensure similarMovies is always an array
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(Card);
