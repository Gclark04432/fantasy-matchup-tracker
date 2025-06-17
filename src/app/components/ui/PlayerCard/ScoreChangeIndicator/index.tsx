'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface ScoreChangeIndicatorProps {
  pointsChange: number | null;
  darkMode: boolean;
}

export const ScoreChangeIndicator = ({
  pointsChange,
  darkMode,
}: ScoreChangeIndicatorProps) => {
  if (pointsChange === null) return null;

  const isPositive = pointsChange > 0;
  const baseStyles =
    'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200';

  const styles = isPositive
    ? `${baseStyles} ${
        darkMode
          ? 'bg-green-500/30 text-green-400 border border-green-500/40'
          : 'bg-green-100 text-green-700 border border-green-300'
      }`
    : `${baseStyles} ${
        darkMode
          ? 'bg-red-500/30 text-red-400 border border-red-500/40'
          : 'bg-red-100 text-red-700 border border-red-300'
      }`;

  return (
    <div className='animate-fade-in absolute -top-2 right-2 z-20'>
      <div className={styles}>
        {isPositive ? (
          <TrendingUp className='h-3.5 w-3.5' />
        ) : (
          <TrendingDown className='h-3.5 w-3.5' />
        )}
        <span>
          {isPositive ? '+' : ''}
          {pointsChange.toFixed(1)}
        </span>
      </div>
    </div>
  );
};
