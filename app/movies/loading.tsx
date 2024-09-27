import CardSkeleton from '@/components/shared/Skeleton/CardSkeleton';

export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {[...Array(10)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
