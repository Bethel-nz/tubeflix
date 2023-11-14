'use client';
import { Movie } from '@/types/types';
import { useLocalStorage } from 'usehooks-ts';
import Card from '@/components/Card/Card';
export default function Favourites() {
	const [movies] = useLocalStorage<Movie[]>('favouriteMovies', []);
	return (
		<div className='mt-4 ml-4'>
			<div className='flex flex-wrap gap-4 items-center justify-center '>
				{movies?.map((movie: Movie) => (
					<div key={movie.id}>
						<Card movie={movie} />
					</div>
				))}
			</div>
		</div>
	);
}
