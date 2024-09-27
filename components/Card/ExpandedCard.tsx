import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, X } from 'lucide-react';
import DateComponent from '../shared/Date/FormattedDate';
import { Movie, Trailer } from '@/types/types';
import { useState, useEffect, memo } from 'react';
import { TransitionPanel } from '@/components/transition-panel';
import fetchMovie from '@/lib/fetchMovie'; // Assuming you have a function to fetch movie details
import { useSearchParams } from 'next/navigation';

type ExpandedCardProps = {
  movie: Movie;
  trailers: Trailer[] | undefined;
  isFavourited: boolean;
  onCollapse: () => void;
  onAddToFavorites: () => void;
  similarMovies: Movie[];
};

const ExpandedCard = ({
  movie,
  trailers,
  isFavourited,
  onCollapse,
  onAddToFavorites,
  similarMovies,
}: ExpandedCardProps) => {
  const params = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentMovie, setCurrentMovie] = useState<Movie>(movie);

  useEffect(() => {
    const id = params.get('id');
    if (id) {
      fetchMovie(parseInt(id)).then((movie: Movie) => {
        setCurrentMovie(movie);
      });
    }
  }, [params]);

  const PANELS = [
    {
      title: 'Info',
      content: <_MovieInfo movie={currentMovie} />,
    },
    {
      title: 'Similar',
      content: <_SimilarMovies similarMovies={similarMovies} />,
    },
    {
      title: 'Trailers',
      content: <_Trailers trailers={trailers} />,
    },
  ];

  const {
    id,
    poster_path = '',
    original_title = '',
    title = '',
    release_date = '',
  } = currentMovie;

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        layoutId={`movie-card-${currentMovie.id}`}
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.02, bottom: 0.3 }}
        onDragEnd={(evt, info) => {
          if (info.offset.y >= 120) {
            onCollapse();
          }
        }}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={cardVariants}
        className='fixed inset-0 bg-black bg-opacity-40 z-[100] overflow-y-auto'
        onClick={onCollapse}
      >
        <div className='min-h-dvh flex items-center justify-center py-8'>
          <motion.div
            className='bg-black/60 backdrop-filter backdrop-blur-3xl rounded-lg p-5 w-[90vw] max-w-[800px] gap-x-4 max-h-[95vh] md:max-h-[80vh] md:relative shadow-lg space-x-3 flex justify-between md:flex-row flex-col'
            onClick={(e) => e.stopPropagation()}
            layoutId={`movie-card-${id}`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute top-2 right-2 z-10'
            >
              <button
                onClick={onCollapse}
                className='bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 rounded-full p-1 sticky top-2'
              >
                <X className='text-white' size={20} />
              </button>
            </motion.div>

            <div className='w-[40%] hidden md:block flex-shrink-0'>
              {poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={`${title}'s poster card`}
                  width={500}
                  height={500}
                  className='rounded-md object-cover'
                  priority
                />
              ) : (
                <div className='w-full h-full bg-gray-800 rounded-md' />
              )}
            </div>
            <div className='md:w-[60%] flex flex-col relative'>
              <h2 className='text-accent-dark font-bold text-2xl mb-2'>
                {original_title || title}
              </h2>
              <p className='text-sm mb-2 text-accent-one'>
                <DateComponent date={release_date} />
              </p>

              <div className='mb-4 flex space-x-2'>
                {PANELS.map((panel, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-md px-3 py-1 text-sm font-medium ${
                      activeIndex === index
                        ? 'bg-amber-500 text-white'
                        : ' dark:bg-zinc-700 dark:text-zinc-400'
                    }`}
                  >
                    {panel.title}
                  </button>
                ))}
              </div>
              <div className='overflow-scroll border-t border-zinc-200 dark:border-zinc-700 flex-grow'>
                <TransitionPanel
                  activeIndex={activeIndex}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  variants={{
                    enter: { opacity: 0, y: -50, filter: 'blur(4px)' },
                    center: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    exit: { opacity: 0, y: 50, filter: 'blur(4px)' },
                  }}
                >
                  {PANELS.map((panel, index) => (
                    <div key={index} className='py-2'>
                      {panel.content}
                    </div>
                  ))}
                </TransitionPanel>
              </div>

              <div className='flex gap-x-4 mb-4 mt-auto'>
                <Link href={`/movies/movie/${id}`}>
                  <motion.button
                    className='bg-amber-500 text-white  text-sm font-semibold px-4 py-2 rounded-md inline-flex items-center gap-1.5'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </motion.button>
                </Link>
                <button
                  onClick={onAddToFavorites}
                  className='flex items-center gap-1 border-3 rounded-md'
                >
                  <span>
                    <Bookmark
                      className={`${
                        isFavourited ? 'fill-accent-dark' : 'fill-none'
                      } border-none`}
                    />
                  </span>
                  <p>Bookmark</p>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(ExpandedCard);

function _Trailers({ trailers }: { trailers: Trailer[] | undefined }) {
  const [loaded, setLoaded] = useState<boolean[]>([]);

  const handleLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <div>
      <div className='flex flex-wrap mt-3 gap-2 max-h-64 overflow-y-auto'>
        {trailers?.map((trailer, index) => (
          <div
            key={trailer.id}
            className='md:h-32 h-60 w-full md:w-48 rounded-md relative'
          >
            {!loaded[index] && (
              <div className='absolute inset-0 flex items-center justify-center bg-gray-800 rounded-md'>
                <div className='bg-gray-700 h-40 rounded-md animate-pulse' />
              </div>
            )}
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                loading='lazy'
                className='w-full h-full rounded-md'
                onLoad={() => handleLoad(index)}
              >
                {trailer.name}
              </iframe>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function _MovieInfo({ movie }: { movie: Movie }) {
  return (
    <div>
      <p className='text-sm text-white mb-4 z-10'>{movie.overview}</p>
    </div>
  );
}

function _SimilarMovies({ similarMovies }: { similarMovies: Movie[] }) {
  const handleMovieClick = (id: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('modal', 'open');
    url.searchParams.set('id', id.toString());
    window.history.pushState({}, '', url.toString());
    window.dispatchEvent(new PopStateEvent('popstate')); // Trigger a popstate event to handle the URL change
  };

  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-4 gap-2 sm:gap-3 md:gap-4 overflow-y-auto max-h-72'>
        {similarMovies.length > 0
          ? similarMovies.map((movie) => (
              <motion.div
                key={movie.id}
                className='rounded-md relative group overflow-hidden shadow-md shadow-primary/-700 w-full cursor-pointer'
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className='aspect-[2/3] w-full'>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={`${movie.title}'s poster card`}
                      width={500}
                      height={750}
                      className='rounded-t-md  w-full  rounded-es-none rounded-ee-none rounded-ss-md rounded-se-md object-cover h-full'
                      priority
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-800 rounded-t-md' />
                  )}
                </div>
                <div className='p-2 w-full rounded-b-md rounded-ss-none rounded-se-none rounded-ee-md rounded-es-md h-fit mt-1 bg-black/80 backdrop-filter backdrop-blur-sm'>
                  <h2 className='text-accent-dark font-bold text-xs sm:text-sm truncate'>
                    {movie.original_title || movie.title}
                  </h2>
                  <p className='text-xs mb-1'>
                    <DateComponent date={movie.release_date} />
                  </p>
                </div>
              </motion.div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className='bg-gray-700 aspect-[2/3] w-full rounded-md animate-pulse'
              ></div>
            ))}
      </div>
    </div>
  );
}
