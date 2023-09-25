'use client';
import CardSkeleton from '@/components/shared/Skeleton/CardSkeleton/CardSkeleton';
import { SkeletonPagination } from '@/components/shared/Skeleton/SkeletonPagination/SkeletonPagination';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error(`Oops there was an error`, {
			message: error?.message,
			cause: error?.cause,
		});
	}, [error]);

	const skeletonArray = Array.from({ length: 20 }, (_, index) => (
		<CardSkeleton key={index} />
	));
	return (
		<div>
			<div className='flex flex-wrap gap-4 items-center justify-center reative scroll-smooth'>
				{skeletonArray}
				<SkeletonPagination maxPageLinks={4} />
			</div>
			<div className='absolute left-2 top-1/2' onLoad={() => reset()} />
		</div>
	);
}
