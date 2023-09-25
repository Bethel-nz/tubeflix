'use client';
import { Navbar } from '@/components/Navbar/navbar';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Tube-Flix',
	description: 'Movie Streaming platform - A Netfflix Clone',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<html lang='en'>
			<body
				className={`${urbanist.className} bg-primary text-accent-one px-4 h-screen flex`}
			>
				<div className=''>{pathname === '/' ? null : <Navbar />}</div>
				<main className='w-full'>{children}</main>
			</body>
		</html>
	);
}
