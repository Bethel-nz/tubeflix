import { Props } from '@/types/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tube-Flix Movies Page',
	description: 'Movie Streaming platform - A Netflix Clone',
};

const Movielayout = ({ children }: Props) => {
	return (
		<section className='py-4 px-2 h-[100dvh] overflow-y-scroll'>
			<div>
				{children}
			</div>
		</section>
	);
};

export default Movielayout;
