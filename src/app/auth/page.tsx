'use client';

import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { useEffect, useState } from 'react';
import { Auth } from '../types/Auth';

export default function AuthLandingPage() {
  const [mode, setMode] = useState<Auth>(Auth.LOGIN);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const handleAuthCTAClick = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('/auth/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          mode: mode,
        }),
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (email.length > 2 && password.length > 2) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [email, password]);

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 via-blue-400 to-gray-800 p-4 text-white'>
      {/* Animated background bubbles */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='animate-blob absolute top-0 left-0 h-72 w-72 rounded-full border-8 border-white bg-purple-400 blur-3xl filter' />
        <div className='animate-blob absolute right-10 bottom-10 h-96 w-96 rounded-full bg-indigo-500 blur-2xl filter' />
        <div className='animate-float absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-amber-400 blur-2xl filter' />
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

        <form className='space-y-4'>
          <Input
            type='email'
            placeholder='Email'
            className='w-full bg-white/30 text-white placeholder-white'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type='password'
            placeholder='Password'
            className='w-full bg-white/30 text-white placeholder-white'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            className='w-full bg-white py-2 text-sky-500 transition hover:cursor-pointer hover:bg-sky-500/70 hover:text-white'
            onClick={handleAuthCTAClick}
            disabled={!buttonEnabled}
          >
            {mode}
          </Button>
        </form>

        <p className='mt-4 text-center'>
          {mode === Auth.LOGIN
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            className='text-white underline hover:cursor-pointer hover:text-sky-400'
            onClick={() =>
              setMode(mode === Auth.LOGIN ? Auth.SIGNUP : Auth.LOGIN)
            }
          >
            {mode === Auth.LOGIN ? Auth.SIGNUP : Auth.LOGIN}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
