const ImageSkeleton = () => {
  return (
    <div className='rounded-md w-72 h-[26em] relative group overflow-hidden shadow-lg animate-pulse flex items-center justify-center text-center border-2'>
      <div className="animate-pulse w-full h-full bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] absolute" />

      
      Image is Missing
    </div>
  );
};

export default ImageSkeleton;