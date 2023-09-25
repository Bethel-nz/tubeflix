import Details from '@/components/Details/Details';
import VideoFrame from '@/components/VideoFrame/VideoFrame';
import fetchMovie from '@/lib/fetchMovie';
import { MovieData } from '@/types/types';
import type { Metadata } from 'next';

type Params = {
	params: {
		id: number;
	};
};

export async function generateMetadata({
	params: { id },
}: Params): Promise<Metadata> {
	const movieData: MovieData = await fetchMovie(id);

	return {
		title: movieData.title,
		description: `This is the page of ${movieData.title}`,
	};
}

export default async function Page({ params: { id } }: Params) {
	const movie: MovieData = await fetchMovie(id);

	return (
		<div className=' mx-auto  relative'>
			<div className='flex items-start space-y-4 lg:space-y-0 gap-x-4'>
				<div className='lg:w-[60rem]'>
					<div className=' rounded-md shadow-md'>
						<VideoFrame imdb_Id={movie.id} tmdb_Id={movie.id} />
					</div>
				</div>
				<Details movie={movie} />
			</div>
		</div>
	);
}
