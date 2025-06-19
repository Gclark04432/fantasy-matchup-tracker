import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-sky-800 text-white'>
      <div className='flex items-center text-4xl font-bold'>
        <AlertTriangle color='black' fill='orange' />
        Not Found
        <AlertTriangle color='black' fill='orange' />
      </div>
      <div className='p-8 text-2xl'>Could not find requested resource</div>
      <Link
        className='cursor-pointer text-2xl underline decoration-sky-900 decoration-2 underline-offset-4 hover:text-indigo-400'
        href='/'
      >
        Return Home
      </Link>
    </div>
  );
}
