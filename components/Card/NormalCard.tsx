import Image from 'next/image';
import { motion } from 'framer-motion';
import DateComponent from '../shared/Date/FormattedDate';
import { Movie } from '@/types/types';

type NormalCardProps = {
  movie: Movie;
  onExpand: () => void;
};

const NormalCard = ({ movie, onExpand }: NormalCardProps) => {
  const {
    poster_path = '',
    backdrop_path = '',
    original_title = '',
    title = '',
    release_date = '',
  } = movie;

  return (
    <motion.div
      className='rounded-md group overflow-hidden shadow-md shadow-primary-700 w-full cursor-pointer transition-all ease-in-out z-10'
      onClick={onExpand}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className='aspect-[2/3] w-full'>
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

export default NormalCard;
