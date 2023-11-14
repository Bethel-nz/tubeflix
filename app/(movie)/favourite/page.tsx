'use client';
import { Movie } from '@/types/types';
import { useLocalStorage } from 'usehooks-ts';
import Card from '@/components/Card/Card';
import Link from 'next/link';
export default function Favourites() {
	const [movies] = useLocalStorage<Movie[]>('favouriteMovies', []);
	return (
		<div className='mt-4 ml-8 w-full'>
			{movies.length >= 1 ? (
				<div className='flex flex-wrap gap-4 items-center justify-center w-full mx-auto'>
					{movies?.map((movie: Movie) => (
						<div key={movie.id}>
							<Card movie={movie} />
						</div>
					))}
				</div>
			) : (
				<div className=' flex flex-col items-center justify-center mx-auto space-y-4 gap-y-8 text-gray-200 font-semibold text-center h-[98dvh] w-[90dvw]'>
					<h2 className=' text-7xl'>Oops! 😢</h2>
					<h3 className='text-4xl'>
						You {`haven't`} selected your favourite movies
					</h3>
					<div className='mt-4'>
						<Link
							href={'/movies?page=1'}
							className='px-12 py-2 text-3xl font-bold duration-200 border-4 rounded-full text-accent-dark hover:text-accent-one border-accent-dark hover:border-accent-one transition-color ease-bezier'
						>
							Start Here
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
