'use client';

import { Zap } from 'lucide-react';

interface ScoreChangeIndicatorProps {
  pointsChange: number | null;
}

export const ScoreChangeIndicator = ({
  pointsChange,
}: ScoreChangeIndicatorProps) => {
  return (
    pointsChange !== null && (
      <div
        className={`animate-fade-in absolute -top-2 -right-2 z-20 transform ${
          pointsChange > 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        <div className='mt-1 flex items-center justify-center rounded-2xl border border-gray-500/30 px-3 shadow-lg backdrop-blur-md'>
          <Zap className='mr-1 h-3 w-3' />
          {pointsChange > 0 ? '+' : ''}
          {pointsChange.toFixed(1)}
        </div>
      </div>
    )
  );
};
