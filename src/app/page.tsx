'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Switch } from '@/app/components/ui/Switch';
import { PlayerCard } from '@/app/components/ui/PlayerCard';
import { Player } from '@/app/types/Player';
import { searchPlayers } from '@/app/lib/playerSearch';
import { Loader2, Search, Eye } from 'lucide-react';
import { samplePlayers } from './data/ExamplePlayers';

export default function FantasyMatchupTracker() {
  const [watchedPlayers, setWatchedPlayers] = useState<Player[]>(samplePlayers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Simulate API call delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      const results = searchPlayers(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addToWatched = (player: Player): void => {
    if (!watchedPlayers.find((p) => p.id === player.id)) {
      setWatchedPlayers((prev) => [...prev, player]);
      setSearchResults([]);
    }
  };

  const removeFromWatched = (playerId: number): void => {
    setWatchedPlayers((prev) => prev.filter((p) => p.id !== playerId));
  };

  return (
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

      {/* Search Bar */}
      <div className='mx-auto mb-8 max-w-6xl'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <Input
            placeholder='Enter player name'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className='flex-grow'
          />
          <Button
            onClick={handleSearch}
            className='transition-transform hover:scale-105'
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </div>

      {/* Main Content - Single Column Layout */}
      <main className='mx-auto max-w-6xl space-y-12'>
        {/* Search Results Section */}
        <section className='space-y-6'>
          <div className='flex items-center gap-3'>
            <Search className='h-6 w-6' />
            <h2 className='text-2xl font-semibold'>Search Results</h2>
          </div>

          {searchResults.length === 0 ? (
            <div className='rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600'>
              <p className='text-gray-500 dark:text-gray-400'>
                Search for players above to see results here.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <AnimatePresence>
                {searchResults.map((player) => (
                  <div key={player.id} className='relative'>
                    <PlayerCard player={player} darkMode={darkMode} />
                    <Button
                      onClick={() => addToWatched(player)}
                      className='absolute top-2 right-2 z-10 h-8 w-8 rounded-full p-0'
                      disabled={
                        watchedPlayers.find((p) => p.id === player.id) !==
                        undefined
                      }
                    >
                      +
                    </Button>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300 dark:border-gray-600'></div>
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-white px-4 text-sm font-medium text-gray-500 dark:bg-gray-900 dark:text-gray-400'>
              Your Watched Players
            </span>
          </div>
        </div>

        {/* Watched Players Section */}
        <section className='space-y-6'>
          <div className='flex items-center gap-3'>
            <Eye className='h-6 w-6' />
            <h2 className='text-2xl font-semibold'>Watched Players</h2>
            <span className='rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
              {watchedPlayers.length}
            </span>
          </div>

          {watchedPlayers.length === 0 ? (
            <div className='rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600'>
              <p className='text-gray-500 dark:text-gray-400'>
                No players being watched yet. Search for players above to start
                tracking them.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <AnimatePresence>
                {watchedPlayers.map((player) => (
                  <div key={player.id} className='relative'>
                    <PlayerCard player={player} darkMode={darkMode} />
                    <Button
                      onClick={() => removeFromWatched(player.id)}
                      className='absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-red-500 p-0 hover:cursor-pointer hover:bg-red-600'
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
