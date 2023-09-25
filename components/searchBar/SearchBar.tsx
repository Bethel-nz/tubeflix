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
		router.push(`/search?q=${value}&page=1`);
	}, [debouncedValue, router, value]);

	return (
		<div className='flex'>
			<input
				className='mx-auto rounded-full w-[24em] md:w-[40em] h-14 px-4 mb-8 mt-4 text-gray-950 font-bold ring-4 ring-accent-dark ring-offset-4'
				type='text'
				placeholder='Search...'
				defaultValue={defaultValue}
				onChange={handleInput}
			/>
		</div>
	);
};

export default SearchBar;
