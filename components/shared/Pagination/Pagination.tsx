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

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  return (
    <div className='pagination-container flex justify-center items-center mt-4'>
      {totalPages !== 1 ? (
        <>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            type='button'
            className='p-1 bg-neutral-800 text-white hover:bg-accent-dark rounded-full disabled:bg-neutral-600'
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          {startPage !== 1 && (
            <>
              <button
                onClick={() => handlePagination(1)}
                type='button'
                className={`p-1 mx-1 text-white rounded-md hover:bg-accent-dark ${
                  currentPage === 1 ? 'bg-accent-dark font-bold' : ''
                }`}
              >
                1
              </button>
              {startPage > 2 && <div className='mx-1 text-white'>•••</div>}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePagination(pageNumber)}
                type='button'
                className={`p-1 mx-1 text-white rounded-md hover:bg-accent-dark ${
                  currentPage === pageNumber ? 'bg-accent-dark' : ''
                }`}
                style={{ minWidth: '32px' }} // Ensures consistent width
              >
                {pageNumber}
              </button>
            );
          })}

          {endPage !== totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <div className='mx-1 text-white'>•••</div>
              )}
              <button
                onClick={() => handlePagination(totalPages)}
                type='button'
                className={`p-1 mx-1 text-white rounded-md hover:bg-accent-dark ${
                  currentPage === totalPages ? 'bg-accent-dark' : ''
                }`}
                style={{ minWidth: '32px' }} // Ensures consistent width
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePagination(currentPage + 1)}
            type='button'
            className='p-1 bg-neutral-800 text-white hover:bg-accent-dark rounded-full disabled:bg-neutral-600'
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </>
      ) : null}
    </div>
  );
};

export const Pagination = PaginationComponent;
