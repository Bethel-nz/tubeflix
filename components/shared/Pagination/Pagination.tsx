'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export interface Props {
	page: number;
	totalPages: number;
	maxPageLinks: number;
}

export const PaginationComponent: React.FC<Props> = ({
	page = 1,
	totalPages,
	maxPageLinks,
}) => {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(page);

	const handlePagination = (newPage: number) => {
		setCurrentPage(newPage);
		const currentUrl = window.location.href;
		const pageNumber = newPage;

		const newUrl = currentUrl.replace(/page=\d+/, `page=${pageNumber}`);

		// Use the new URL for navigation
		router.push(newUrl);
	};

	let startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
	const endPage = Math.min(totalPages, startPage + maxPageLinks - 2);

	if (endPage - startPage + 1 < maxPageLinks) {
		startPage = Math.max(1, endPage - maxPageLinks + 3);
	}

	return (
		<div className='pagination-container'>
			{totalPages !== 1 ? (
				<>
					<div className='hidden bg-slate-900/30  border-gray-400/40 bg-clip-padding backdrop-filter md:flex justify-center items-center mt-8 gap-2 border-2 w-fit rounded-full mx-auto  bg-opacity-70 backdrop-blur-md h-full p-6'>
						<button
							onClick={() => handlePagination(currentPage - 1)}
							type='button'
							className='p-3 bg-accent-dark text-white hover:bg-accent-dark rounded-full disabled:bg-accent-light'
							disabled={currentPage === 1}
						>
							<ChevronLeft />
						</button>

						{startPage !== 1 && (
							<>
								<button
									onClick={() => handlePagination(1)}
									type='button'
									className={`p-3 mx-2 text-white rounded-md hover:bg-accent-dark  ${
										currentPage === 1
											? 'bg-accent-dark rounded-md font-bold'
											: ''
									}`}
								>
									1
								</button>
								{startPage > 2 && (
									<div className='mx-2 text-2xl font-bold'>•••</div>
								)}
							</>
						)}

						{Array.from({ length: endPage - startPage + 1 }, (_, index) => {
							const pageNumber = startPage + index;
							return (
								<button
									key={pageNumber}
									onClick={() => handlePagination(pageNumber)}
									type='button'
									className={`p-3 mx-2  text-white rounded-md hover:bg-accent-dark ${
										currentPage === pageNumber
											? 'bg-accent-dark rounded-md'
											: ''
									}`}
								>
									{pageNumber}
								</button>
							);
						})}

						{endPage !== totalPages && (
							<>
								{endPage < totalPages - 1 && (
									<div className='mx-2 text-2xl font-bold'>•••</div>
								)}
								<button
									onClick={() => handlePagination(totalPages)}
									type='button'
									className={`p-3  text-white hover:bg-accent-dark rounded-md disabled:bg-accent-light ${
										currentPage === totalPages
											? 'bg-accent-dark rounded-md '
											: ''
									}`}
								>
									{totalPages}
								</button>
							</>
						)}

						<button
							onClick={() => handlePagination(currentPage + 1)}
							type='button'
							className='p-3 bg-accent-dark text-white hover:bg-accent-dark rounded-full disabled:bg-accent-light'
							disabled={currentPage === totalPages}
						>
							<ChevronRight />
						</button>
					</div>
					<div className='md:hidden bg-slate-900/30  border-gray-400/40 bg-clip-padding backdrop-filter flex justify-center items-center mt-8 gap-x-4 border-2 w-72 rounded-full mx-auto  bg-opacity-70 backdrop-blur-md h-full p-6'>
						<button
							onClick={() => handlePagination(currentPage - 1)}
							type='button'
							className='p-3 bg-accent-dark text-white hover:bg-accent-dark rounded-full'
						>
							<ChevronLeft />
						</button>
						<span className='text-inputTextColor font-bold'>{page}</span>
						<span className='text-white'>of</span>
						<span>{totalPages}</span>
						<button
							onClick={() => handlePagination(currentPage + 1)}
							type='button'
							className='p-3 bg-accent-dark text-white hover:bg-accent-dark rounded-full'
						>
							<ChevronRight />
						</button>
					</div>
				</>
			) : null}
		</div>
	);
};

export const Pagination = PaginationComponent;
