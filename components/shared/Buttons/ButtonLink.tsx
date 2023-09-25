'use client';
import { ButtonLinkProp } from '@/types/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ButtonLink = ({ children, path, ...props }: ButtonLinkProp) => {
	return (
		<>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 1, duration: 1, ease: [0, 0.22, 0.51, 0.83] }}
				className='mt-24'
			>
				<Link href={path} {...props}>
					{children}
				</Link>
			</motion.div>
		</>
	);
};

export default ButtonLink;
