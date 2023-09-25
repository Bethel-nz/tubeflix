'use client';
import ButtonLink from '@/components/shared/Buttons/ButtonLink';
import { TubeFlix } from '@/components/svgs/TubeFlix';
import { motion } from 'framer-motion';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tube-Flix - Home',
	description: 'Movie Streaming platform - A Netfflix Clone',
};

const Page = () => {
	return (
		<div className='flex flex-col items-center h-screen justify-center '>
			<TubeFlix />
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 1, duration: 1, ease: [0, 0.22, 0.51, 0.83] }}
				className='mt-24'
			>
				<ButtonLink
					path={'/movies?page=1'}
					className='px-12 py-2 text-3xl font-bold duration-200 border-4 rounded-full text-accent-dark hover:text-accent-one border-accent-dark hover:border-accent-one transition-color ease-bezier'
				>
					GO
				</ButtonLink>
			</motion.div>
		</div>
	);
};

export default Page;
