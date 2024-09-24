'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export interface Props {
  page: number;
  totalPages: number;
}

export const PaginationComponent: React.FC<Props> = ({
  page = 1,
  totalPages,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);

  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
    const currentUrl = window.location.href;
    const pageNumber = newPage;

    let newUrl;
    if (currentUrl.includes('page=')) {
      newUrl = currentUrl.replace(/page=\d+/, `page=${pageNumber}`);
    } else {
      const separator = currentUrl.includes('?') ? '&' : '?';
      newUrl = `${currentUrl}${separator}page=${pageNumber}`;
    }

    // Use the new URL for navigation
    router.push(newUrl);
  };

  const renderPageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      onClick={() => handlePagination(pageNumber)}
      type='button'
      className={`p-1 mx-1 text-white rounded-md hover:bg-accent-dark ${
        currentPage === pageNumber ? 'bg-accent-dark' : ''
      }`}
      style={{ minWidth: '32px' }}
    >
      {pageNumber}
    </button>
  );

  const renderEllipsis = (key: string) => (
    <div key={key} className='mx-1 text-white'>
      •••
    </div>
  );

  const pageButtons = [];
  const showLeftEllipsis = currentPage > 4;
  const showRightEllipsis = currentPage < totalPages - 3;

  if (showLeftEllipsis) {
    pageButtons.push(renderPageButton(1));
    pageButtons.push(renderEllipsis('left'));
  }

  let start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 5);

  if (end - start < 5 && start > 1) {
    start = Math.max(1, end - 5);
  }

  for (let i = start; i <= end; i++) {
    pageButtons.push(renderPageButton(i));
  }

  if (showRightEllipsis) {
    pageButtons.push(renderEllipsis('right'));
    pageButtons.push(renderPageButton(totalPages));
  }

  return (
    <div className='pagination-container flex justify-center items-center mt-16 '>
      <div className='bg-neutral-900 w-fit flex items-center justify-center tracking-wider space-x-1 md:space-x-2 py-2 md:py-4 px-2 md:px-3 rounded-lg'>
        {totalPages !== 1 ? (
          <>
            <button
              onClick={() => handlePagination(currentPage - 1)}
              type='button'
              className='p-2 bg-neutral-800 text-white hover:bg-accent-dark rounded-full disabled:bg-neutral-600'
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>

            {pageButtons}

            <button
              onClick={() => handlePagination(currentPage + 1)}
              type='button'
              className='p-2 bg-neutral-800 text-white hover:bg-accent-dark rounded-full disabled:bg-neutral-600'
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export const Pagination = PaginationComponent;
