'use client';

import { Movie } from '@/types/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Tilt } from 'react-tilt';
import DateComponent from '../shared/Date/FormattedDate';
import CardSkeleton from '../shared/Skeleton/CardSkeleton/CardSkeleton';
type Card = {
	movie: Movie;
};

const Card = ({ movie }: Card) => {
	const defaultOptions = {
		reverse: true,
		max: 35,
		perspective: 1500,
		speed: 2000,
		transition: true,
		axis: null,
		reset: true,
		easing: 'cubic-bezier(.03,.98,.52,.99)',
		scale: 1,
	};
	const cardVariants = {
		initial: { opacity: 0, scale: 0.8 }, // Initial state
		animate: { opacity: 1, scale: 1, transition: { duration: 0.8 } }, // Animation state
	};
	if (!movie) {
		return null; // or you can render a placeholder or loading state
	}

	// Destructure movie properties with default values if they are missing
	const {
		backdrop_path = '',
		poster_path = '',
		original_title = '',
		title = '',
		release_date = '',
	} = movie;

	return (
		<motion.div
			key={movie.id}
			variants={cardVariants}
			initial='initial'
			animate='animate'
		>
			<Tilt options={defaultOptions}>
				<Suspense fallback={<CardSkeleton />}>
					<div
						className={`rounded-md w-72 md:h-full h-[26em] relative group overflow-hidden shadow-md shadow-primary/-700`}
					>
						<div>
							<Image
								src={
									'https://image.tmdb.org/t/p/w500' +
									(poster_path || backdrop_path)
								}
								alt={`${title}'s poster card`}
								width={500}
								height={500}
								className={`object-fit-contain rounded-md h-full w-full`}
							/>
						</div>
						<div className='bg-slate-900/30 border-2 border-gray-400/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md rounded-r-md absolute -bottom-10 p-4 h-40 w-full md:group-hover:bottom-0 opacity-100 md:opacity-0 md:group-hover:opacity-100  transition-all ease-bezier duration-500 delay-300'>
							<h2 className='text-accent-dark font-bold text-2xl'>
								{original_title || title}
							</h2>
							<p className='text-sm mb-3'>
								{<DateComponent date={release_date} />}
							</p>
							<div className=''>
								<Link
									href={`/movies/movie/${movie.id}`}
									className='bg-accent-dark text-xl font-semibold px-4 py-2 absolute translate-x-1/2 -translate-y-1/2 top-0 right-14 rounded-sm  transition-opacity duration-300'
								>
									Watch Now
								</Link>
							</div>
						</div>
					</div>
				</Suspense>
			</Tilt>
		</motion.div>
	);
};

export default Card;
