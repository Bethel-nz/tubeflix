'use client';
import { ButtonLinkProp } from '@/types/types';
import Link from 'next/link';

const ButtonLink = ({ children, path, ...props }: ButtonLinkProp) => {
	return (
		<Link href={path} {...props}>
			{children}
		</Link>
	);
};

export default ButtonLink;
