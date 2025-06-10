'use client';

import { PlayerStats } from '@/app/types/PlayerStats';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ActualProps {
  pointsChange: number | null;
  currentStats: PlayerStats;
  isPositive: boolean;
}

export const Actual = ({
  pointsChange,
  currentStats,
  isPositive,
}: ActualProps) => {
  return (
    <div className='rounded-xl border border-gray-800/30 bg-gradient-to-br from-zinc-800/60 to-zinc-950/30 p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
      <div
        className={`text-foreground mb-1 flex items-center justify-center gap-2 text-3xl font-bold transition-all duration-300 ${
          pointsChange !== null ? 'animate-scale-in' : ''
        }`}
      >
        {currentStats.points.toFixed(1)}
        {isPositive ? (
          <TrendingUp className='h-5 w-5 text-green-500' />
        ) : (
          <TrendingDown className='h-5 w-5 text-red-500' />
        )}
      </div>
      <div className='text-xs font-medium tracking-wide text-gray-500 text-stone-500 uppercase'>
        Fantasy Points
      </div>
    </div>
  );
};
