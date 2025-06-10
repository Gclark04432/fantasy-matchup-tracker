'use client';

import { PlayerStats } from '@/app/types/PlayerStats';

interface ProjectedProps {
  currentStats: PlayerStats;
}

export const Projected = ({ currentStats }: ProjectedProps) => {
  return (
    <div className='rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-500/20 to-sky-500/5 p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
      <div className='mb-1 text-3xl font-bold text-sky-500'>
        {currentStats.projection.toFixed(1)}
      </div>
      <div className='text-xs font-medium tracking-wide text-gray-500 text-stone-500 uppercase'>
        Projected
      </div>
    </div>
  );
};
