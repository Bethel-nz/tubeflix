'use client';
import { AnimatePresence, motion } from 'framer-motion';
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

	return (
		<>
			<div
				className={`${
					openDetails ? 'lg:w-[40%]' : ' w-20 h-8 '
				} bg-black/90 rounded-tr-md p-6 shadow-xl absolute bottom-0 flex flex-col`}
			>
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={' relative -translate-y-1/2 ml-auto '}
					onClick={() => {
						setOpenDetails((prev) => !prev);
					}}
				>
					{openDetails ? (
						<PanelLeftClose size={32} />
					) : (
						<PanelLeftOpen size={32} />
					)}
				</motion.button>

				<AnimatePresence initial={false}>
					{openDetails && (
						<motion.div
							className={`overflow-hidden ${openDetails ? 'block' : ''}`}
							initial={{ opacity: 0, height: 0, width: 0 }}
							animate={{ opacity: 1, height: 'auto', width: 'auto' }}
							exit={{ opacity: 0, height: 0, width: 0 }}
							transition={{
								duration: 0.8,
								type: 'spring',
							}}
						>
							<div>
								<h1 className='text-3xl font-bold mt-4 underline-offset-4 underline decoration-accent-dark'>
									{movie.title || movie.original_title}
								</h1>
								<p className='text-lg mt-2 text-justify md:text-left'>
									{movie.overview}
								</p>
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
									<ul className='h-60 overflow-y-scroll'>
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
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export default Details;
