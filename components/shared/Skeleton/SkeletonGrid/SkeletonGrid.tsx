import CardSkeleton from '../CardSkeleton/CardSkeleton';
import { SkeletonPagination } from '../SkeletonPagination/SkeletonPagination';

const SkeletonGrid = () => {
	const skeletonArray = Array.from({ length: 20 }, (_, index) => (
		<CardSkeleton key={index} />
	));

	return (
		<div>
			<div className='flex flex-wrap gap-4 items-center justify-center'>
				{skeletonArray}
			</div>
			<SkeletonPagination maxPageLinks={4} />
		</div>
	);
};

export default SkeletonGrid;
