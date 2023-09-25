import { ReactNode } from 'react';
type Props = {
	children: ReactNode;
};
const SearchLayout = ({ children }: Props) => {
	return (
		<section className='py-4 px-2 h-screen overflow-y-scroll'>
			<div>{children}</div>
		</section>
	);
};

export default SearchLayout;
