'use client';

import { PlayerStats } from '@/app/types/PlayerStats';
import { Projected } from './Projected';
import { Actual } from './Actual';

interface StatSectionProps {
  currentStats: PlayerStats;
  pointsChange: number | null;
  isPositive: boolean;
}

export const StatSection = ({
  currentStats,
  pointsChange,
  isPositive,
}: StatSectionProps) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Actual
        pointsChange={pointsChange}
        currentStats={currentStats}
        isPositive={isPositive}
      />
      <Projected currentStats={currentStats} />
    </div>
  );
};
