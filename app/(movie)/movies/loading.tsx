'use client';
import CardSkeleton from '@/components/shared/Skeleton/CardSkeleton/CardSkeleton';

export default function Loading() {
	const skeletonArray = Array.from({ length: 20 }, (_, index) => (
		<CardSkeleton key={index} />
	));
	return (
		<div>
			<div className='flex flex-wrap gap-4 items-center justify-center reative scroll-smooth'>
				{skeletonArray}
			</div>
		</div>
	);
}
