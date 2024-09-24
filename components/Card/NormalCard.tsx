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
      className='rounded-md relative group overflow-hidden shadow-md shadow-primary/-700 w-[8rem] md:w-72 cursor-pointer'
      onClick={onExpand}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className='h-[12rem] md:h-[22rem]'>
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              poster_path || backdrop_path
            }`}
            alt={`${title}'s poster card`}
            width={500}
            height={500}
            className='rounded-es-none rounded-ee-none rounded-ss-md rounded-se-md object-cover h-full'
            priority
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=='
          />
        ) : (
          <div className='w-full h-full bg-gray-800' />
        )}
      </div>
      <div className='p-2 w-full rounded-ss-none rounded-se-none rounded-ee-md rounded-es-md h-fit mt-1 bg-black/80 backdrop-filter backdrop-blur-sm'>
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
