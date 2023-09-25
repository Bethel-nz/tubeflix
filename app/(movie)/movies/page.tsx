import Card from '@/components/Card/Card';
import { Pagination } from '@/components/shared/Pagination/Pagination';
import fetchMovies from '@/lib/fetchMovies';
import { Movie } from '@/types/types';
import { Metadata } from 'next';

type Props = {
	params?: string;
	searchParams: {
		page: number;
	};
};

export const metadata: Metadata = {
	title: 'Tube-Flix - Movies',
	description: 'Movie Streaming platform - A Netfflix Clone',
};

export async function generateStaticParams() {
	const moviesData = await fetchMovies();
	const { data } = moviesData;
	const { results: movies } = data;

	return movies.map((movie) => ({
		id: movie.id,
	}));
}

export default async function Movies({ searchParams }: Props) {
	const { page } = searchParams;
	const moviesData = await fetchMovies(page);
	const { data } = moviesData;
	const { results: movies } = data;

	return (
		<div>
			<div className='flex flex-wrap gap-4 items-center justify-center'>
				{movies?.map((movie: Movie) => (
					<div key={movie.id}>
						<Card movie={movie} />
					</div>
				))}
			</div>
			<div>
				<Pagination page={Number(page)} totalPages={500} maxPageLinks={8} />
			</div>
		</div>
	);
}
