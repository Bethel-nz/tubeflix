import MovieLoading from '@/components/shared/Skeleton/MovieLoading';

const Loading = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-black/50'>
      <MovieLoading />
    </div>
  );
};

export default Loading;
