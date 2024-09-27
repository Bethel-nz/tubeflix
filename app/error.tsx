'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white'>
      <h2 className='text-4xl font-bold mb-4'>Oops! Something went wrong</h2>
      <p className='text-xl mb-8'>
        We&apos;re sorry, but an unexpected error occurred.
      </p>
      <div className='flex space-x-4'>
        <button
          onClick={reset}
          className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
        >
          Try again
        </button>
        <Link
          href='/'
          className='px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors'
        >
          Go to Home
        </Link>
      </div>
      {error.digest && (
        <p className='mt-4 text-sm text-gray-400'>Error ID: {error.digest}</p>
      )}
    </div>
  );
}
