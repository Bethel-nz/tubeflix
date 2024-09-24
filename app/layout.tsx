import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tube-Flix',
  description: 'Movie Streaming platform - A Netfflix Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${urbanist.className} bg-primary text-accent-one `}>
        <main className='w-full'>{children}</main>
      </body>
    </html>
  );
}
