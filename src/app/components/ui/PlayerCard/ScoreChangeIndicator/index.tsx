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
          pointsChange > 0 ? 'fantasy-success' : 'fantasy-danger'
        }`}
      >
        <div className='fantasy-glass/100 mt-1 flex items-center justify-center rounded-2xl border-current px-3 shadow-lg backdrop-blur-md'>
          <Zap className='mr-1 h-3 w-3' />
          {pointsChange > 0 ? '+' : ''}
          {pointsChange.toFixed(1)}
        </div>
      </div>
    )
  );
};
