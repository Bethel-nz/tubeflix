'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, KeyboardEvent, useEffect, useRef } from 'react';

type props = {
  defaultValue: string;
};

const SearchBar = ({ defaultValue }: props) => {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(value, 500);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim() !== '') {
      router.push(`/search?q=${searchValue}&page=1`);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value.trim() !== '') {
      handleSearch(value); 
    }
  };


  
  useEffect(() => {
    if (debouncedValue.trim() !== '') {
      handleSearch(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className='w-full flex'>
      <input
        ref={inputRef}
        className='mx-auto rounded-md bg-neutral-800 w-full md:w-[20em] text-neutral-100 h-8 px-4 font-bold ring-1 focus-within:ring-amber-500 ring-offset-2'
        type='text'
        placeholder='Search...'
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
