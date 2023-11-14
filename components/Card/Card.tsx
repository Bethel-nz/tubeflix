'use client';

import { useLocalStorage } from 'usehooks-ts';
import { Suspense, useEffect, useState } from 'react';
import { Movie } from '@/types/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import DateComponent from '../shared/Date/FormattedDate';
import CardSkeleton from '../shared/Skeleton/CardSkeleton/CardSkeleton';
import { Star } from 'lucide-react';
type Card = {
	movie: Movie;
};

const Card = ({ movie }: Card) => {
	const [isFavourited, setIsFavourited] = useState<boolean>(false);
	const [storedFavorites, setStoredFavourites] = useLocalStorage<Movie[]>(
		'favouriteMovies',
		[]
	);

	const cardVariants = {
		initial: { opacity: 0, scale: 0.8 }, // Initial state
		animate: { opacity: 1, scale: 1, transition: { duration: 0.8 } }, // Animation state
	};
	useEffect(() => {
		if (!movie) {
			return;
		}
		const isOnArray = storedFavorites.some(
			(fav: { id: number }) => fav.id === movie.id
		);
		setIsFavourited(isOnArray);
	}, [movie, storedFavorites]);

	const addToFavorites = (movie: Movie) => {
		const isOnArray = storedFavorites.some(
			(fav: { id: number }) => fav.id === movie.id
		);
		if (isOnArray) {
			return setStoredFavourites((prev) =>
				prev.filter((fav: { id: number }) => fav.id !== movie.id)
			);
		} else {
			return setStoredFavourites((prev) => [...prev, movie]);
		}
	};

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
			<Suspense fallback={<CardSkeleton />}>
				<div
					className={`rounded-md w-72 md:h-full h-[26em] relative group overflow-hidden shadow-md shadow-primary/-700`}
				>
					<button
						className='absolute top-0 p-2 rounded-r-md bg-slate-900/30 bg-clip-padding backdrop-filter backdrop-blur-md'
						onClick={() => addToFavorites(movie)}
					>
						<Star
							className={`${
								isFavourited ? 'fill-accent-dark ' : ''
							} focus:outline-none`}
						/>
					</button>
					<div>
						{poster_path ? (
							<Image
								src={
									'https://image.tmdb.org/t/p/w500' +
									(poster_path || backdrop_path)
								}
								alt={`${title}'s poster card`}
								width={500}
								height={500}
								className={`object-fit-contain rounded-md h-full w-full`}
								priority
							/>
						) : (
							<div className='w-full h-[26em] bg-gray-800' />
						)}
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
								className='bg-accent-dark text-xl font-semibold px-4 py-2 absolute translate-x-1/2  bottom-0 right-14  transition-opacity duration-300 rounded-tl-md'
							>
								Watch Now
							</Link>
						</div>
					</div>
				</div>
			</Suspense>
		</motion.div>
	);
};

export default Card;
