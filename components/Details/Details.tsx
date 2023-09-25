'use client';
import { motion } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type details = {
	movie: {
		genres: {
			id: number;
			name: string;
		}[];
		videos: {
			results: {
				name: string;
				key: string;
				id: string;
			}[];
		};
		title: string;
		original_title: string;
		overview: string;
	};
};

const Details = ({ movie }: details) => {
	const [openDetails, setOpenDetails] = useState(true);

	const variants = {
		open: { opacity: 1, height: 'auto', width: 'auto' },
		closed: { opacity: 0, height: 0, width: 0 },
	};

	return (
		<>
			<div
				className={`${
					openDetails ? 'lg:w-[40%]' : 'w-24 h-8 '
				} bg-black/90 rounded-md md:rounded-l-md pl-4 p-8 shadow-xl md:absolute md:bottom-0 bottom-20`}
			>
				<button
					className={' relative  -translate-y-1/2 left-0'}
					onClick={() => {
						setOpenDetails((prev) => !prev);
					}}
				>
					{openDetails ? (
						<PanelLeftClose size={32} />
					) : (
						<PanelLeftOpen size={32} />
					)}
				</button>

				<motion.div
					className='overflow-hidden'
					initial='closed'
					animate={openDetails ? 'open' : 'closed'}
					variants={variants}
					transition={{
						ease: 'easeIn',
						duration: 0.3,
						delay: 0.5,
						type: 'spring',
					}}
				>
					<div>
						<h1 className='text-3xl font-bold mt-4 underline-offset-4 underline decoration-accent-dark'>
							{movie.title || movie.original_title}
						</h1>
						<p className='text-lg mt-2 '>{movie.overview}</p>
						<div className='flex flex-wrap gap-4 mt-4'>
							{movie.genres.map((genre) => (
								<div key={genre.id}>
									<p className='font-semibold border-accent-dark border-2 hover:bg-accent-dark px-4 py-2 rounded-md transition-colors duration-200 delay-500'>
										{genre.name}
									</p>
								</div>
							))}
						</div>
						<div className='mt-12'>
							<h2 className='font-bold text-2xl'>Trailers:</h2>
							<ul>
								{movie.videos.results.map((video) => (
									<li key={video.key} className=''>
										<Link
											href={`https://www.youtube.com/watch?v=${video.key}`}
											className='font-semibold ml-4 first-letter:text-red-600'
										>
											<h3>{video.name}</h3>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default Details;
