'use client';
import { SearchIcon } from 'lucide-react';
import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

type props = {
  defaultValue: string;
};

const SearchBar = ({ defaultValue }: props) => {
  const [searchSubmittedOutline, setSearchSubmittedOutline] = useState(false);
  const [searchSubmittedShadow, setSearchSubmittedShadow] = useState(false);
  const [searchValue, setSearchValue] = useState(defaultValue);
  const router = useRouter();
  const debouncedValue = useDebounce(searchValue, 500);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = useCallback(() => {
    setSearchSubmittedOutline(true);
    setSearchSubmittedShadow(true);
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}&page=1`);
    }
  }, [searchValue, router]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      handleSearch();
    }
  }, [debouncedValue, handleSearch]);

  useEffect(() => {
    if (searchSubmittedOutline) {
      setTimeout(() => {
        setSearchSubmittedOutline(false);
      }, 150);
    }
  }, [searchSubmittedOutline]);

  useEffect(() => {
    if (searchSubmittedShadow) {
      setTimeout(() => {
        setSearchSubmittedShadow(false);
      }, 1000);
    }
  }, [searchSubmittedShadow]);

  return (
    <label
      className={cn(
        'rounded-md relative white origin-center inline-flex',
        'transition-all transform-gpu ease-in-out group',
        'relative',
        searchSubmittedShadow
          ? 'before:shadow-[0px_0px_0px_5px_blue] before:blur-2xl'
          : 'before:shadow-[0px_0px_1px_0px_#FFFFFF00] before:blur-0',
        searchSubmittedOutline
          ? 'scale-90 duration-75'
          : 'duration-300 hover:scale-105'
      )}
      htmlFor='search'
    >
      <input
        id='search'
        value={searchValue}
        onChange={handleInput}
        className={cn(
          'p-2 md:focus:max-w-96 max-w-full  transition-all transform-gpu ease-in-out rounded-md pl-10 peer',
          'bg-neutral-800',
          'focus-within:ring-accent-dark ring-offset-4',
          'outline outline-1 -outline-offset-1',
          searchSubmittedOutline
            ? 'duration-150 outline-accent-mid'
            : 'duration-300 outline-neutral-200/0 hover:outline-neutral-200/100 dark:outline-neutral-800/0 hover:dark:outline-neutral-800/100 dark:focus:placeholder-neutral-300/100',
          'placeholder-neutral-300/0 focus:placeholder-neutral-300/100 dark:placeholder-neutral-700/0 focus:dark:placeholder-neutral-700/100'
        )}
        placeholder='Search Tube-Flix...'
        onKeyDown={handleKeyPress}
        onSubmit={handleSearch}
        onBlur={() => {
          setSearchSubmittedOutline(false);
          setSearchSubmittedShadow(false);
          setSearchValue('');
        }}
        type='search'
      />
      <SearchIcon className='size-5 top-1/2 left-3.5 absolute -translate-y-1/2 pointer-events-none text-neutral-300 dark:text-neutral-700 transition-colors peer-focus:text-neutral-500' />
    </label>
  );
};

export default SearchBar;
