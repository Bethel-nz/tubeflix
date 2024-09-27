y 6'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

import SearchBar from '../searchBar/SearchBar';

type NavItemProps = {
  href: string;
  icon?: React.ElementType;
  text: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, text }) => {
  const pathName = usePathname();
  const isActive = pathName === href || pathName.includes(href);

  return (
    <div>
      <Link
        href={href}
        className={`flex items-center text-md md:text-sm space-x-2 ${
          isActive ? 'text-[#F5C518]' : 'text-gray-400'
        } hover:text-[#F5C518] transition-colors`}
      >
        {Icon && <Icon size={20} className='mr-1' />}
        <span>{text}</span>
      </Link>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') as string;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-black text-white py-2 px-4 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'h-auto sticky top-0 left-0' : ''
      }`}
    >
      <div className='max-w-full mx-auto flex items-center md:px-8 px-2'>
        <div className='flex items-center space-x-4 justify-between w-full'>
          <div className='flex items-center'>
            <Link href='/movies?page=1' className='flex items-center'>
              <span className='text-[#F5C518] font-bold text-2xl mr-2 '>
                Tube-Flix
              </span>
            </Link>
            <div className='hidden md:flex'>
              <NavItem href='/movies?page=1' text='Movies' />
              {/* <NavItem href='/tv-shows' text='TV Shows' />*/}
              {/* <NavItem href='/watch' text='Watch' /> */}
            </div>
          </div>
          <div className='flex items-center justify-end gap-8'>
            <div className='hidden md:flex items-center space-x-4'>
              <div>
                <SearchBar defaultValue={query } />
              </div>
              <div>
                <NavItem href='/watchlist' icon={Bookmark} text='Watchlist' />
              </div>
            </div>
            <button
              className='md:hidden flex items-center'
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <motion.div
        className='md:hidden overflow-hidden'
        initial={{ height: 0 }}
        animate={{ height: isOpen ? height : 0 }}
      >
        <div
          ref={ref}
          className='flex flex-col items-center justify-center space-y-2 px-8 py-4'
        >
          <SearchBar defaultValue={query} />

          <NavItem href='/movies?page=1' text='Movies' />
          {/* <NavItem href='/tv-shows' text='TV Shows' /> */}
          {/* <NavItem href='/watch' text='Watch' /> */}
          <NavItem href='/watchlist' text='Watchlist' />
        </div>
      </motion.div>
    </nav>
  );
};
