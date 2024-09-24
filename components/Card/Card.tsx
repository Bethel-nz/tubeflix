'use client';
import { useLocalStorage } from 'usehooks-ts';
import { Suspense, useEffect, useState, memo, useMemo, lazy } from 'react';
import { useRouter } from 'next/navigation';
import { Movie, MovieData, Trailer } from '@/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import CardSkeleton from '../shared/Skeleton/CardSkeleton/CardSkeleton';
import { getTrailer } from '@/lib/fetchTrailer';
import { fetchSimilarMovies } from '@/lib/fetchSimilar';
const NormalCard = lazy(() => import('./NormalCard'));
const ExpandedCard = lazy(() => import('./ExpandedCard'));

type CardProps = {
  movie: Partial<MovieData>;
  isExpanded: boolean;
  onExpand: (id: number) => void;
  onCollapse: () => void;
};

const Card = ({ movie, isExpanded, onExpand, onCollapse }: CardProps) => {
  const router = useRouter();
  const [cardState, setCardState] = useState({
    isFavourited: false,
    trailers: undefined as Trailer[] | undefined,
    similarMovies: undefined as MovieData[] | undefined,
  });

  const [storedFavorites, setStoredFavourites] = useLocalStorage<MovieData[]>(
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

  const addToFavorites = (movie: MovieData) => {
    setStoredFavourites((prev) =>
      isOnArray ? prev.filter((fav) => fav.id !== movie.id) : [...prev, movie]
    );
  };

  const handleExpand = () => {
    router.push(`?modal=open&id=${movie.id}`);
    onExpand(movie.id!);
  };

  const handleCollapse = () => {
    router.push(`?modal=close&id=${movie.id}`);
    onCollapse();
  };

  return (
    <Suspense fallback={<CardSkeleton />}>
      <motion.div
        layout
        className='relative'
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
      >
        <NormalCard movie={movie as Movie} onExpand={handleExpand} />

        <AnimatePresence mode='popLayout'>
          {isExpanded && (
            <ExpandedCard
              movie={movie as MovieData}
              trailers={cardState.trailers}
              isFavourited={cardState.isFavourited}
              onCollapse={handleCollapse}
              onAddToFavorites={() => addToFavorites(movie as MovieData)}
              similarMovies={cardState.similarMovies || []} // Ensure similarMovies is always an array
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Suspense>
  );
};

const MemoizedCard = memo(Card);
MemoizedCard.displayName = 'Card';
export default Card;
