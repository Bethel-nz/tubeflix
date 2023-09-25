import React from 'react';

export interface Props {
	maxPageLinks: number;
}

export const SkeletonPagination: React.FC<Props> = ({ maxPageLinks }) => {
	return (
		<div className='pagination-container'>
			{/* Skeleton Loading */}
			<div className='flex justify-center items-center mt-8 gap-2 border-2 w-[24em] rounded-full mx-auto text-lg bg-opacity-70 backdrop-blur-md'>
				<div className='animate-pulse bg-gray-300 text-gray-400 rounded-full w-4 h-6'></div>

				{/* Placeholder Buttons (Loop based on maxPageLinks) */}
				{Array.from({ length: maxPageLinks }, (_, index) => (
					<div
						key={index}
						className='animate-pulse bg-gray-300 text-gray-400 rounded-full w-10 h-6'
					></div>
				))}

				<div className='animate-pulse bg-gray-300 text-gray-400 rounded-full w-4 h-6'></div>
			</div>
		</div>
	);
};
