import ButtonLink from '@/components/shared/Buttons/ButtonLink';
import { TubeFlix } from '@/components/svgs/TubeFlix';

const Page = () => {
	return (
		<div className='flex flex-col items-center h-screen justify-center '>
			<TubeFlix />
			<ButtonLink
				path={'/movies?page=1'}
				className='px-12 py-2 text-3xl font-bold duration-200 border-4 rounded-full text-accent-dark hover:text-accent-one border-accent-dark hover:border-accent-one transition-color ease-bezier'
			>
				GO
			</ButtonLink>
		</div>
	);
};

export default Page;
