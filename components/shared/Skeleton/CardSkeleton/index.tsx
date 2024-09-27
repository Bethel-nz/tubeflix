const CardSkeleton = () => {
  return (
    <div className='rounded-md w-full sm:w-48 md:w-56 lg:w-64 h-72 sm:h-80 md:h-88 lg:h-96 relative group overflow-hidden shadow-lg animate-pulse'>
      <div className='bg-gray-700/20 rounded-md h-full w-full'></div>
    </div>
  );
};

export default CardSkeleton;
