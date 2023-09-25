const Loading = () => {
	return (
		<div>
			<div className='mx-auto relative'>
				<div className='flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 gap-x-4'>
					<div className='lg:w-[60rem]'>
						<div className='rounded-md bg-gray-300 h-[60rem]'></div>
					</div>
					<div className='lg:w-[40%] bg-black/90 rounded-md md:rounded-l-none md:rounded-r-md pl-4 p-8 shadow-xl md:absolute md:bottom-0'>
						<h1 className='text-3xl font-bold mt-4 bg-gray-300 w-[80%] h-8'></h1>
						<p className='text-lg mt-2 bg-gray-300 w-[100%] h-4'></p>
						<div className='flex flex-wrap gap-4 mt-4'>
							<div className='bg-gray-300 w-32 h-8'></div>
							<div className='bg-gray-300 w-32 h-8'></div>
							<div className='bg-gray-300 w-32 h-8'></div>
						</div>
						<div className='mt-4'>
							<h2 className='font-bold text-2xl'>Trailers:</h2>
							<ul>
								<li className='bg-gray-300 w-32 h-6'></li>
								<li className='bg-gray-300 w-32 h-6'></li>
								<li className='bg-gray-300 w-32 h-6'></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
