import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, X } from 'lucide-react';
import DateComponent from '../shared/Date/FormattedDate';
import { Movie, Trailer } from '@/types/types';
import { useState } from 'react';
import { TransitionPanel } from '@/components/transition-panel';

// import MovieCard from './MovieCard'; // Import the MovieCard component

type ExpandedCardProps = {
  movie: Movie;
  trailers: Trailer[] | undefined;
  isFavourited: boolean;
  onCollapse: () => void;
  onAddToFavorites: () => void;
  // similarMovies: Movie[];
};

const ExpandedCard = ({
  movie,
  trailers,
  isFavourited,
  onCollapse,
  onAddToFavorites,
}: ExpandedCardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const PANELS = [
    {
      title: 'Info',
      content: <_MovieInfo movie={movie} />,
    },
    {
      title: 'Similar',
      content: <_SimilarMovies />,
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
    // overview = '',
  } = movie;

  return (
    <motion.div
      layoutId={`movie-card-${movie.id}`}
      drag='y'
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.02, bottom: 0.3 }}
      onDragEnd={(evt, info) => {
        if (info.offset.y >= 120) {
          onCollapse();
        }
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className='fixed inset-0 bg-black bg-opacity-40 z-50 overflow-y-auto'
      onClick={onCollapse}
    >
      <div className='min-h-screen flex items-center justify-center py-8'>
        <motion.div
          className='bg-black/80 backdrop-filter backdrop-blur-3xl rounded-lg p-6 w-[90vw] max-w-[800px] max-h-[95vh] md:max-h-[80vh] relative shadow-lg space-x-3 flex md:flex-row flex-col'
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
              className='bg-neutral-300/30 backdrop-filter backdrop-blur-md rounded-full p-2 sticky top-2'
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
            <div className='flex gap-x-4 mb-4'>
              <Link href={`/movies/${id}`}>
                <motion.button
                  className='bg-accent-dark text-white  text-sm font-semibold px-4 py-2 rounded-md inline-flex items-center gap-1.5'
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
                className='flex items-center gap-2 border-3 rounded-md'
              >
                <span>
                  <Bookmark
                    className={`
                    ${
                      isFavourited ? 'fill-accent-dark' : 'fill-none'
                    } border-none`}
                  />
                </span>
                <p>Bookmark</p>
              </button>
            </div>

            

            {/* Add the transition panel here */}
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
            <div className='overflow-hidden border-t border-zinc-200 dark:border-zinc-700'>
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

            

            {/* <div className='mt-8'>
              <h3 className='text-xl font-semibold mb-4'>Similar Movies</h3>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {similarMovies.slice(0, 4).map((similarMovie) => (
                  <MovieCard key={similarMovie.id} movie={similarMovie} />
                ))}
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExpandedCard;

function _Trailers({ trailers }: { trailers: Trailer[] | undefined }) {
  return (
    <div>
      <h3 className='text-xl text-balance mb-4'>Trailers</h3>
      <div className='flex flex-wrap mt-3 gap-2 overflow-y-auto'>
        {trailers?.map((trailer) => (
          <div
            key={trailer.id}
            className='md:h-32 h-60 w-full md:w-48 rounded-md'
          >
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                loading='lazy'
                className='w-full h-full rounded-md'
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

function _SimilarMovies() {
  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>Similar Movies</h3>
      {/* Add a skeleton or placeholder for similar movies */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className='bg-gray-700 h-40 rounded-md animate-pulse'
          ></div>
        ))}
      </div>
    </div>
  );
}
