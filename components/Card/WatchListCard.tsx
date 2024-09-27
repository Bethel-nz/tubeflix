'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DateComponent from '../shared/Date/FormattedDate';
import { Movie } from '@/types/types';
import { FaTrash, FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

type WatchListCardProps = {
  movie: Movie;
  onRemove: (id: number) => void;
};

const WatchListCard = ({ movie, onRemove }: WatchListCardProps) => {
  const router = useRouter();
  const {
    id,
    poster_path = '',
    backdrop_path = '',
    original_title = '',
    title = '',
    release_date = '',
  } = movie;

  return (
    <motion.div
      className='rounded-md group overflow-hidden shadow-md shadow-primary-700 w-full cursor-pointer transition-all ease-in-out z-10'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className='aspect-[2/3] w-full relative'>
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              poster_path || backdrop_path
            }`}
            width={500}
            height={500}
            alt={`${title}'s poster card`}
            className='rounded-t-md object-cover w-full h-full'
            priority
          />
        ) : (
          <div className='w-full h-full bg-gray-800' />
        )}
        <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-4'>
          <button
            onClick={() => router.push(`/movies/movie/${id}`)}
            className='p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition-colors duration-200'
            aria-label='Watch movie'
          >
            <FaPlay className='text-white' />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className='p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200'
            aria-label='Remove from watchlist'
          >
            <FaTrash className='text-white' />
          </button>
        </div>
      </div>
      <div className='p-2 w-full rounded-b-md h-fit bg-black/80 backdrop-filter backdrop-blur-sm'>
        <h2 className='text-accent-dark font-bold text-sm sm:text-base truncate'>
          {original_title || title}
        </h2>
        <p className='text-xs mb-1'>
          <DateComponent date={release_date} />
        </p>
      </div>
    </motion.div>
  );
};

export default WatchListCard;
