import { ReactNode } from 'react';
type Props = {
	children: ReactNode;
};
const SearchLayout = ({ children }: Props) => {
	return (
		<section className='mt-4 px-4 h-screen overflow-y-scroll grid justify-center w-[95vw]'>
			<div className='mx-auto '>{children}</div>
		</section>
	);
};

export default SearchLayout;
