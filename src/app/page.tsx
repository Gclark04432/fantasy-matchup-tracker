'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Switch } from '@/app/components/ui/Switch';
import { PlayerCard } from '@/app/components/ui/PlayerCard/PlayerCard';
import { Player } from '@/app/types/Player';
import { mockSearch } from '@/app/lib/mockSearch';
import { Loader2 } from 'lucide-react';
import { samplePlayers } from './data/ExamplePlayers';
import { AuthLandingPage } from './components/ui/LoginPage';

export default function FantasyMatchupTracker() {
  const [players, setPlayers] = useState<Player[]>(samplePlayers);
  const [query, setQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    if (!query) return;
    setLoading(true);
    try {
      await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: players[0].id,
          name: players[0].name,
          team: players[0].team,
        }),
      });
    } catch (e) {
      console.log(e);
    }
    // setTimeout(() => {
    //   const player = mockSearch(query);
    //   setPlayers((prev) => [...prev, player]);
    //   setQuery('');
    //   setLoading(false);
    // }, 500); // simulate fetch delay
  };

  return !loggedIn ? (
    <AuthLandingPage />
  ) : (
    <div
      className={`min-h-screen px-4 py-10 transition-colors duration-500 sm:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      {/* Header */}
      <header className='mx-auto mb-10 max-w-6xl'>
        <div className='flex items-center justify-between'>
          <h1 className='text-center text-3xl font-bold sm:text-left sm:text-4xl'>
            Fantasy Matchup Tracker
          </h1>
          <div className='flex items-center gap-2'>
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-6xl space-y-10'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <Input
            placeholder='Enter player name'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='flex-grow'
          />
          <Button
            onClick={handleSearch}
            className='transition-transform hover:scale-105'
            disabled={loading}
          >
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              'Track Player'
            )}
          </Button>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <AnimatePresence>
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} darkMode={darkMode} />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
