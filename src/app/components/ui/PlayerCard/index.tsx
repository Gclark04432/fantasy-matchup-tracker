import { getInjuryStatusColor } from '@/app/lib/getInjuryStatusColor';
import { getPositionColor } from '@/app/lib/getPositionColor';
import { Player } from '@/app/types/Player';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { StatPeriodSelection } from './StatPeriodSelection';
import { ScoreChangeIndicator } from './ScoreChangeIndicator';
import { PlayerInfoSection } from './PlayerInfoSection';

interface PlayerCardProps {
  player: Player;
  darkMode: boolean;
}

export function PlayerCard({ player, darkMode }: PlayerCardProps) {
  const [previousPoints, setPreviousPoints] = useState(
    player.seasonStats.points,
  );
  const [pointsChange, setPointsChange] = useState<number | null>(null);
  const [showWeekStats, setShowWeekStats] = useState(false);

  const currentStats = showWeekStats ? player.weekStats : player.seasonStats;

  useEffect(() => {
    const relevantPoints = showWeekStats
      ? player.weekStats.points
      : player.seasonStats.points;
    if (relevantPoints !== previousPoints) {
      const change = relevantPoints - previousPoints;
      setPointsChange(change);
      setPreviousPoints(relevantPoints);

      // Clear the change indicator after 3 seconds
      const timer = setTimeout(() => setPointsChange(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [
    player.seasonStats.points,
    player.weekStats.points,
    previousPoints,
    showWeekStats,
  ]);
  const isPositive = currentStats.points >= currentStats.projection;

  return (
    <div
      className={`fantasy-glass hover:shadow-3xl group relative cursor-pointer overflow-hidden border-0 shadow-2xl transition-all duration-500 hover:scale-[1.03] ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      {/* Enhanced Team Color Accent with Glow */}
      <div
        className='absolute top-0 right-0 left-0 h-2 opacity-90 shadow-lg'
        style={{
          backgroundColor: player.teamColor,
          boxShadow: `0 0 20px ${player.teamColor}`,
        }}
      />

      {/* Dynamic Background with Team Color Influence */}
      <div
        className='absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50'
        style={{
          background: `linear-gradient(150deg, ${player.teamColor}, transparent 80%)`,
        }}
      />

      <div className='fantasy-gradient absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80' />

      <ScoreChangeIndicator pointsChange={pointsChange} />

      <div className='relative space-y-5 p-6'>
        <PlayerInfoSection player={player} />

        <StatPeriodSelection
          handleStatPeriodSelectionChange={() =>
            setShowWeekStats(!showWeekStats)
          }
          currentStatPeriod={showWeekStats ? 'This Week' : 'Season'}
        />

        {/* Enhanced Stats Grid */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Enhanced Points Display */}
          <div className='rounded-xl bg-gradient-to-br from-zinc-800/60 to-zinc-950/30 p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
            <div
              className={`text-foreground mb-1 flex items-center justify-center gap-2 text-3xl font-bold transition-all duration-300 ${
                pointsChange !== null ? 'animate-scale-in' : ''
              }`}
            >
              {currentStats.points.toFixed(1)}
              {isPositive ? (
                <TrendingUp className='fantasy-success h-5 w-5' />
              ) : (
                <TrendingDown className='fantasy-danger h-5 w-5' />
              )}
            </div>
            <div className='text-muted-foreground text-xs font-medium tracking-wide text-stone-500 uppercase'>
              Fantasy Points
            </div>
          </div>

          {/* Enhanced Projection */}
          <div className='rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-500/20 to-sky-500/5 p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
            <div className='mb-1 text-3xl font-bold text-sky-500'>
              {currentStats.projection.toFixed(1)}
            </div>
            <div className='text-muted-foreground text-xs font-medium tracking-wide text-stone-500 uppercase'>
              Projected
            </div>
          </div>
        </div>

        {/* Enhanced Detailed Stats */}
        <div className='space-y-3'>
          <div className='text-muted-foreground flex items-center gap-2 text-sm font-semibold'>
            <div className='h-2 w-2 rounded-full bg-sky-500'></div>
            {showWeekStats ? 'Week Stats' : 'Season Stats'}
          </div>

          <div className='border-border/30 grid grid-cols-2 gap-3 rounded-lg border bg-zinc-950/20 p-4 text-sm backdrop-blur-sm'>
            {/* ... keep existing code (position-specific stats rendering) */}
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div
        className='absolute right-0 bottom-0 left-0 h-1 opacity-60'
        style={{
          background: `linear-gradient(90deg, transparent, ${player.teamColor}, transparent)`,
        }}
      />
    </div>
  );
}
