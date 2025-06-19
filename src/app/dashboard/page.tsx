'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Switch } from '@/app/components/ui/Switch';
import { PlayerCard } from '@/app/components/ui/PlayerCard';
import { Player } from '@/app/types/Player';
import { searchPlayers, getPlayersByIds } from '@/app/lib/playerSearch';
import { WatchedPlayersService } from '@/app/lib/watchedPlayersService';
import { ScoreSimulator } from '@/app/lib/scoreSimulator';
import { createClient } from '@/app/lib/supabase/client';
import { Loader2, Search, Eye, User, LogOut, Play, Pause } from 'lucide-react';
import { useRouter } from 'next/navigation'


export default function FantasyMatchupTracker() {
  const [watchedPlayers, setWatchedPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSimulationRunning, setIsSimulationRunning] =
    useState<boolean>(false);
const router = useRouter()

  // Initialize Supabase and load user data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const supabase = await createClient();

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.email) {
          setUser({ email: user.email });
          setUserEmail(user.email);
          await loadWatchedPlayers(user.email);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Load watched players from database
  const loadWatchedPlayers = async (email: string) => {
    try {
      const playerIds = await WatchedPlayersService.getWatchedPlayers(email);
      const players = getPlayersByIds(playerIds);
      setWatchedPlayers(players);
    } catch (error) {
      console.error('Error loading watched players:', error);
    }
  };

  // Save watched players to database
  const saveWatchedPlayers = async (players: Player[]) => {
    if (!userEmail) return;

    setIsSaving(true);
    try {
      const playerIds = players.map((p) => p.id);
      const success = await WatchedPlayersService.saveWatchedPlayers(
        userEmail,
        playerIds,
      );

      if (!success) {
        console.error('Failed to save watched players');
      } else {
        console.log('Successfully saved players to database');
      }
    } catch (error) {
      console.error('Error saving watched players:', error);
    } finally {
      setIsSaving(false);
    }
  };

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

  const addToWatched = async (player: Player): Promise<void> => {
    if (!userEmail) {
      alert('Please sign in to save players to your watchlist');
      return;
    }

    if (!watchedPlayers.find((p) => p.id === player.id)) {
      const updatedPlayers = [...watchedPlayers, player];
      setWatchedPlayers(updatedPlayers);
      setSearchResults([]);
      await saveWatchedPlayers(updatedPlayers);
    }
  };

  const removeFromWatched = async (playerId: number): Promise<void> => {
    if (!userEmail) return;

    const updatedPlayers = watchedPlayers.filter((p) => p.id !== playerId);
    setWatchedPlayers(updatedPlayers);
    await saveWatchedPlayers(updatedPlayers);
  };

  const handleSignOut = async () => {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
      setUser(null);
      setUserEmail('');
      setWatchedPlayers([]);
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle score updates from simulator
  const handleScoreUpdate = (playerId: number, newPoints: number) => {
    // Update watched players
    setWatchedPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? {
              ...player,
              seasonStats: { ...player.seasonStats, points: newPoints },
            }
          : player,
      ),
    );

    // Update search results if the player is in them
    setSearchResults((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? {
              ...player,
              seasonStats: { ...player.seasonStats, points: newPoints },
            }
          : player,
      ),
    );
  };

  // Toggle score simulation
  const toggleSimulation = () => {
    if (isSimulationRunning) {
      ScoreSimulator.stopSimulation();
      setIsSimulationRunning(false);
    } else {
      ScoreSimulator.startSimulation(handleScoreUpdate);
      setIsSimulationRunning(true);
    }
  };

  // Cleanup simulation on unmount
  useEffect(() => {
    return () => {
      ScoreSimulator.stopSimulation();
    };
  }, []);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors duration-500 sm:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      {/* Header */}
      <header className='mx-auto mb-10 max-w-6xl'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <h1 className='text-center text-2xl font-bold sm:text-left sm:text-4xl'>
            Fantasy Matchup Tracker
          </h1>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4'>
            {user ? (
              <div className='flex flex-col items-center gap-2 sm:flex-row sm:gap-2'>
                <div className='flex items-center gap-1'>
                  <User className='h-4 w-4' />
                  <span className='max-w-[150px] truncate text-sm'>
                    {userEmail}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  className='flex cursor-pointer items-center gap-1 bg-sky-800 px-3 py-2 text-sm'
                >
                  <LogOut className='h-3 w-3' />
                  <span className='hidden sm:inline'>Sign Out</span>
                </Button>
              </div>
            ) : (
              <span className='text-center text-sm text-gray-500 sm:text-left'>
                Not signed in
              </span>
            )}

            <div className='flex flex-col items-center gap-3 sm:flex-row sm:gap-2'>
              <Button
                onClick={toggleSimulation}
                className={`flex items-center gap-1 px-3 py-2 text-sm hover:cursor-pointer ${isSimulationRunning ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
              >
                {isSimulationRunning ? (
                  <>
                    <Pause className='h-3 w-3' />
                    <span className='hidden sm:inline'>Stop Live Updates</span>
                    <span className='sm:hidden'>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className='h-3 w-3' />
                    <span className='hidden sm:inline'>Start Live Updates</span>
                    <span className='sm:hidden'>Start</span>
                  </>
                )}
              </Button>

              <div className='flex items-center gap-2'>
                <span className='text-sm'>Dark Mode</span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
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
            className='bg-sky-800 px-6 py-2 text-white transition-transform hover:scale-105 hover:cursor-pointer'
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
              <AnimatePresence mode='wait'>
                {searchResults.map((player) => (
                  <div key={`search-${player.id}`} className='relative'>
                    <PlayerCard player={player} darkMode={darkMode} />
                    <Button
                      onClick={() => addToWatched(player)}
                      className='absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-sky-800 p-0 text-white hover:cursor-pointer'
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
            {isSaving && (
              <Loader2 className='h-4 w-4 animate-spin text-blue-500' />
            )}
          </div>

          {!user ? (
            <div className='rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600'>
              <p className='text-gray-500 dark:text-gray-400'>
                Please sign in to save and track your watched players.
              </p>
            </div>
          ) : watchedPlayers.length === 0 ? (
            <div className='rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600'>
              <p className='text-gray-500 dark:text-gray-400'>
                No players being watched yet. Search for players above to start
                tracking them.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <AnimatePresence mode='wait'>
                {watchedPlayers.map((player) => {
                  return (
                    <div key={`watched-${player.id}`} className='relative'>
                      <PlayerCard player={player} darkMode={darkMode} />
                      <Button
                        onClick={() => removeFromWatched(player.id)}
                        className='absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-red-500 p-0 text-white hover:cursor-pointer hover:bg-red-600'
                      >
                        ×
                      </Button>
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
