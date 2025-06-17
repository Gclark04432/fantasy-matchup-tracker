import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { login, signup } from './actions';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccess('Logged in successfully!');
      } else {
        await signup(email, password);
        setSuccess('Account created! Check your email.');
      }
    } catch {
      setError('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-br from-sky-500 via-blue-400 to-gray-800 md:flex-row'>
      {/* Left Panel */}
      <div className='relative hidden flex-col items-center justify-center overflow-hidden p-12 md:flex md:w-1/2'>
        <div className='absolute inset-0 z-0'>
          <div className='animate-blob absolute top-0 left-0 h-72 w-72 rounded-full border-8 border-white bg-purple-400 blur-3xl filter' />
          <div className='animate-blob absolute right-10 bottom-10 h-96 w-96 rounded-full bg-indigo-500 blur-2xl filter' />
          <div className='animate-float absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-amber-400 blur-2xl filter' />
        </div>
        <div className='z-10 flex flex-col items-center'>
          <Image
            src='/globe.svg'
            alt='Fantasy Logo'
            width={80}
            height={80}
            className='mb-4'
          />
          <h1 className='mb-2 text-4xl font-extrabold text-white drop-shadow'>
            Fantasy Matchup Tracker
          </h1>
          <p className='mb-8 max-w-xs text-center text-lg text-white/80'>
            Track your favorite NFL players, compare fantasy stats, and build
            winning lineups.
          </p>
          <div className='mt-8 max-w-xs text-center text-white/70 italic'>
            &quot;Victory is reserved for those who are willing to pay its
            price.&quot;
            <br />– Sun Tzu
          </div>
        </div>
      </div>
      {/* Right Panel (Auth Card) */}
      <div className='flex w-full items-center justify-center p-4 md:w-1/2'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='z-10 w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur'
        >
          {/* Tabs */}
          <div className='mb-8 flex justify-center'>
            <button
              className={`rounded-full px-6 py-2 text-lg font-bold transition-all duration-200 ${mode === 'login' ? 'bg-sky-500 text-white shadow' : 'border border-sky-500 bg-white text-sky-500'}`}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              className={`ml-2 rounded-full px-6 py-2 text-lg font-bold transition-all duration-200 ${mode === 'signup' ? 'bg-sky-500 text-white shadow' : 'border border-sky-500 bg-white text-sky-500'}`}
              onClick={() => setMode('signup')}
            >
              Sign Up
            </button>
          </div>
          {/* Form */}
          <form className='space-y-4' onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <Input
                type='text'
                placeholder='Full Name'
                className='w-full bg-white/70 text-sky-900 placeholder-sky-400'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}
            <Input
              type='email'
              placeholder='Email Address'
              className='w-full bg-white/70 text-sky-900 placeholder-sky-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='w-full bg-white/70 pr-12 text-sky-900 placeholder-sky-400'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                className='absolute top-1/2 right-3 -translate-y-1/2 text-sky-500 hover:text-sky-700'
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <div className='flex items-center justify-between'>
              <label className='flex items-center text-sm text-sky-900'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='mr-2 accent-sky-500'
                />
                Remember Me
              </label>
              <button
                type='button'
                className='text-sm text-sky-500 hover:underline'
                onClick={() =>
                  setError('Forgot password flow not implemented.')
                }
              >
                Forgot Password?
              </button>
            </div>
            <Button
              className='w-full bg-sky-500 py-2 text-lg font-bold text-white transition hover:bg-sky-600 disabled:opacity-50'
              type='submit'
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Login'
                  : 'Sign Up'}
            </Button>
            <div className='mt-2 flex flex-col gap-2'>
              <button
                type='button'
                className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2 text-sky-700 transition hover:bg-sky-50'
                onClick={() => setError('Social login not implemented.')}
              >
                <span className='text-xl'>🔵</span> Continue with Google
              </button>
              <button
                type='button'
                className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2 text-sky-700 transition hover:bg-sky-50'
                onClick={() => setError('Social login not implemented.')}
              >
                <span className='text-xl'>🔷</span> Continue with Facebook
              </button>
            </div>
          </form>
          {/* Feedback */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-4 rounded-lg bg-red-100 px-4 py-2 text-center text-red-700'
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-4 rounded-lg bg-green-100 px-4 py-2 text-center text-green-700'
            >
              {success}
            </motion.div>
          )}
          {/* Switch Auth Mode (for mobile) */}
          <div className='mt-6 text-center md:hidden'>
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <button
              className='text-sky-500 underline hover:text-sky-700'
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
