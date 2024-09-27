'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

type props = {
  defaultValue: string;
};
const SearchBar = ({ defaultValue }: props) => {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const debouncedValue = useDebounce(value, 500);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (debouncedValue) {
      router.push(`/search?q=${debouncedValue}&page=1`);
    } else {
      router.push('/search');
    }
  }, [debouncedValue, router]);
  return (
    <div className='w-full flex'>
      <input
        className='mx-auto rounded-md bg-neutral-800 w-full md:w-[24em] text-neutral-100 h-8 px-4 mb-8 mt-4 font-bold ring-1 focus-within:ring-amber-500 ring-offset-2'
        type='text'
        placeholder='Search...'
        defaultValue={defaultValue}
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchBar;
