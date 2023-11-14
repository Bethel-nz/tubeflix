'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	useEffect(() => {
		if (pathname === '/movies/movie')
			return router.replace('/movies?page=1', { scroll: false });
	}, [pathname, router]);
}
