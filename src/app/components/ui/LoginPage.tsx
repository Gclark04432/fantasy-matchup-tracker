import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { useState } from 'react';

interface AuthLandingPageProps {
  handleLogIn: () => void;
}

export const AuthLandingPage = ({ handleLogIn }: AuthLandingPageProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-800 p-4 text-white'>
      {/* Animated background bubbles */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='animate-blob absolute top-0 left-0 h-72 w-72 rounded-full border-8 border-white bg-purple-400 blur-3xl filter' />
        <div className='animate-blob absolute right-10 bottom-10 h-96 w-96 rounded-full bg-indigo-500 blur-2xl filter' />
        <div className='animate-float absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-pink-400 blur-2xl filter' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className='w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur'
      >
        <h1 className='mb-2 text-center text-4xl font-extrabold'>
          Fantasy Matchup Tracker
        </h1>
        <p className='mb-6 text-center text-sm text-white/80'>
          Track your favorite NFL players, compare fantasy stats, and build
          winning lineups.
        </p>

        <h2 className='mb-6 text-center text-2xl font-bold'>
          {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
        </h2>

        <form className='space-y-4'>
          {mode === 'signup' && (
            <Input
              placeholder='Full Name'
              className='w-full bg-white/30 text-white placeholder-white'
            />
          )}
          <Input
            type='email'
            placeholder='Email'
            className='w-full bg-white/30 text-white placeholder-white'
          />
          <Input
            type='password'
            placeholder='Password'
            className='w-full bg-white/30 text-white placeholder-white'
          />
          <Button
            className='w-full bg-white py-2 text-purple-700 transition hover:cursor-pointer hover:bg-purple-500/70 hover:text-white'
            onClick={handleLogIn}
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
        </form>

        <p className='mt-4 text-center'>
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            className='text-white underline hover:cursor-pointer hover:text-purple-200'
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
