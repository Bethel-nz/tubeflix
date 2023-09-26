'use client';
import { Search } from 'lucide-react';
import { MdOutlineMovieFilter } from 'react-icons/md';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
	const pathName = usePathname();
	const isActive = (path: string) => pathName === path;
	return (
		<>
			<nav className='inline-flex flex-col gap-8 justify-between px-4 mt-4 transition-all border-2 rounded-md shadown-lg border-accent-dark ease-bezier '>
				<div>
					<Link href='/movies?page=1'>
						<MdOutlineMovieFilter
							size={28}
							className={`${isActive('/movies?page=1') ? 'active' : ''} `}
						/>
					</Link>
					<Link href='/search'>
						<Search className={isActive('/search') ? 'active' : ''} size={28} />
					</Link>
				</div>
				{/* <div className='border rounded-md border-accent-mid/30 ' />
				<div className='hidden'>
					<Link href='/favourite'>
						<AiOutlineStar
							size={28}
							className={isActive('/favourite') ? 'active' : ''}
						/>
					</Link>
					<Link href='/settings'>
						<FaUserCircle
							size={28}
							className={isActive('/settings') ? 'active' : ''}
						/>
					</Link>
				</div> */}
			</nav>
		</>
	);
};
