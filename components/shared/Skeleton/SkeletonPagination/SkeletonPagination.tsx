import React from 'react';

export interface Props {
  maxPageLinks: number;
}

export const SkeletonPagination: React.FC<Props> = ({ maxPageLinks }) => {
  return (
    <div className='pagination-container flex justify-center items-center mt-16'>
      <div className='bg-neutral-900 w-fit flex items-center justify-center tracking-wider space-x-1 md:space-x-2 py-2 md:py-4 px-2 md:px-3 rounded-lg'>
        {/* Left arrow button */}
        <div className='p-2 bg-neutral-800 rounded-full w-8 h-8 animate-pulse'></div>

        {/* Page buttons */}
        {Array.from({ length: maxPageLinks }, (_, index) => (
          <div
            key={index}
            className='p-1 mx-1 bg-neutral-800 rounded-md w-8 h-8 animate-pulse'
          ></div>
        ))}

        {/* Right arrow button */}
        <div className='p-2 bg-neutral-800 rounded-full w-8 h-8 animate-pulse'></div>
      </div>
    </div>
  );
};
