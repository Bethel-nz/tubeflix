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
import Card from '@/components/Card/Card';

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

	const skeletonArray = Array.from({ length: 20 }, (_, index) => (
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
							<Card movie={movie} />
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
