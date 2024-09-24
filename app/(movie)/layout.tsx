import { Navbar } from '@/components/Navbar/navbar';
import { ReactNode } from 'react';
type Props = {
  children: ReactNode;
  
};

export default function Layout({ children }: Props) {


  return (
    <div className='flex flex-col'>
      <div>
        <Navbar />
      </div>

      <main className='px-4'>{children}</main>
    </div>
  );
}
