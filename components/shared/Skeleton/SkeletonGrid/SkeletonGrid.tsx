import CardSkeleton from '../CardSkeleton';
import { SkeletonPagination } from '../SkeletonPagination/SkeletonPagination';

const SkeletonGrid = () => {
  const skeletonArray = Array.from({ length: 20 }, (_, index) => (
    <CardSkeleton key={index} />
  ));

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {skeletonArray}
      </div>
      <SkeletonPagination maxPageLinks={4} />
    </div>
  );
};

export default SkeletonGrid;
