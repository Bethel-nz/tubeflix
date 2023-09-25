const CardSkeleton = () => {
	return (
		<div className='rounded-md w-72 h-96 relative group overflow-hidden shadown-lg animate-pulse'>
			<div className='bg-gray-700/20 rounded-md h-full w-full'></div>
			<div className='bg-slate-900/30 border-2 border-gray-400/40 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md rounded-r-md absolute -bottom-10 p-4 h-40 w-full group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all ease-bezier duration-500 delay-300'>
				<div className='bg-blueish-gray rounded-sm h-4 w-3/4 mb-2'></div>
				<div className='bg-blueish-gray rounded-sm h-4 w-1/2'></div>
			</div>
		</div>
	);
};

export default CardSkeleton;
