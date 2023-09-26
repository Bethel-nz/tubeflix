import SearchBar from '@/components/searchBar/SearchBar';
import DateComponent from '@/components/shared/Date/FormattedDate';
import { Pagination } from '@/components/shared/Pagination/Pagination';
import CardSkeleton from '@/components/shared/Skeleton/CardSkeleton/CardSkeleton';
import ImageSkeleton from '@/components/shared/Skeleton/ImageSkeleton/ImageSkeleton';
import getResult from '@/lib/getResult';
import { Movie } from '@/types/types';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	searchParams: {
		page: number;
		q: string;
	};
};

export const metadata: Metadata = {
	title: 'Tube-Flix Search Page',
	description: 'Movie Streaming platform - A Netflix Clone',
};

export default async function Movies({ searchParams }: Props) {
	const { q, page } = searchParams;
	const moviesData = await getResult(q, page);
	const { results: result } = moviesData;

	const skeletonArray = Array.from({ length: 2 }, (_, index) => (
		<CardSkeleton key={index} />
	));
	return (
		<div className=''>
			<div className='flex justify-center items-center mx-auto'>
				<SearchBar defaultValue={q} />
			</div>
			{!q ? (
				<div>
					<p className='text-2xl text-white text-center mb-8'>Search A Movie</p>
				</div>
			) : (
				<div className='flex flex-wrap gap-4 items-center justify-center'>
					{result?.map((movie: Movie) => (
						<div key={movie.id}>
							<div
								className={`rounded-md w-72 md:h-full h-[28em] relative group overflow-hidden shadow-md shadow-primary/-700`}
							>
								<div>
									{movie.poster_path || movie.backdrop_path ? (
										<Image
											src={
												'https://image.tmdb.org/t/p/w500' +
												(movie.poster_path || movie.backdrop_path)
											}
											alt={`${movie.title}'s poster card`}
											width={500}
											height={500}
											className={`object-fit-contain rounded-md h-full w-full`}
										/>
									) : (
										<ImageSkeleton />
									)}
								</div>
								<div className='bg-slate-900/30 border-2 border-gray-400/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md rounded-r-md absolute -bottom-10 p-4 h-40 w-full md:group-hover:bottom-0 opacity-100 md:opacity-0 md:group-hover:opacity-100  transition-all ease-bezier duration-500 delay-300'>
									<h2 className='text-accent-dark font-bold text-2xl'>
										{movie.original_title || movie.title}
									</h2>
									<p className='text-sm mb-3'>
										{<DateComponent date={movie.release_date} />}
									</p>
									<div>
										<Link
											href={`/movies/movie/${movie.id}`}
											className='bg-accent-dark text-xl font-semibold px-4 py-2 absolute translate-x-1/2 -translate-y-1/2 top-0 right-14 rounded-sm  transition-opacity duration-300'
										>
											Watch Now
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<div>
				<Pagination
					page={Number(page) || 1}
					totalPages={moviesData.total_pages}
					maxPageLinks={8}
				/>
			</div>
		</div>
	);
}
