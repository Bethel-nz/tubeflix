import { Props } from '@/types/types';

const Movielayout = ({ children }: Props) => {
	return (
		<section className='py-4 px-2 h-[100dvh] overflow-y-scroll'>
			<div>{children}</div>
		</section>
	);
};

export default Movielayout;
