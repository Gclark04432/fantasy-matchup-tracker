import { Button } from '@/app/components/ui/Button';
import { getInjuryStatusColor } from '@/app/lib/getInjuryStatusColor';
import { getPositionColor } from '@/app/lib/getPositionColor';
import { Player } from '@/app/types/Player';
import {
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { StatPeriodSelection } from './StatPeriodSelection';

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
          boxShadow: `0 0 20px ${player.teamColor}40`,
        }}
      />

      {/* Dynamic Background with Team Color Influence */}
      <div
        className='absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50'
        style={{
          background: `linear-gradient(135deg, ${player.teamColor}20, transparent 70%)`,
        }}
      />

      {/* Enhanced Background Gradient */}
      <div className='fantasy-gradient absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80' />

      {/* Floating Score Change Indicator */}
      {pointsChange !== null && (
        <div
          className={`animate-fade-in absolute -top-2 -right-2 z-20 rotate-12 transform ${
            pointsChange > 0 ? 'fantasy-success' : 'fantasy-danger'
          }`}
        >
          <div className='fantasy-glass border-current shadow-lg backdrop-blur-md'>
            <Zap className='mr-1 h-3 w-3' />
            {pointsChange > 0 ? '+' : ''}
            {pointsChange.toFixed(1)}
          </div>
        </div>
      )}

      <div className='relative space-y-5 p-6'>
        {/* Enhanced Header */}
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-4'>
            {/* Enhanced Player Photo with Glow Effect */}
            <div className='group/avatar relative'>
              <div
                className='flex h-18 w-18 items-center justify-center rounded-full text-xl font-bold text-white shadow-2xl transition-all duration-300 group-hover/avatar:scale-110'
                style={{
                  background: `linear-gradient(135deg, ${player.teamColor}, ${player.teamColor}80)`,
                  boxShadow: `0 8px 32px ${player.teamColor}40`,
                }}
              >
                {player.photoUrl ? (
                  <Image
                    src={player.photoUrl}
                    alt={player.name}
                    className='h-full w-full rounded-full object-cover'
                  />
                ) : (
                  player.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                )}
              </div>

              {/* Enhanced Projected Indicator */}
              {player.isProjectedToScore && (
                <div className='absolute -top-2 -right-2 flex h-7 w-7 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg'>
                  <Star className='h-4 w-4 fill-current text-white' />
                </div>
              )}
            </div>

            {/* Enhanced Player Info */}
            <div className='space-y-2'>
              <h3 className='text-foreground group-hover:text-primary text-xl leading-tight font-bold transition-all duration-300'>
                {player.name}
              </h3>
              <div className='flex items-center gap-3'>
                <div
                  className={`${getPositionColor(player.position)} border px-3 py-1 font-bold shadow-md`}
                >
                  {player.position}
                </div>
                <span className='text-muted-foreground bg-card/50 rounded-md px-2 py-1 text-sm font-medium'>
                  {player.team}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Injury Status */}
          <div
            className={`${getInjuryStatusColor(player.injuryStatus)} font-semibold shadow-sm`}
          >
            {player.injuryStatus || 'Healthy'}
          </div>
        </div>

        <StatPeriodSelection
          handleStatPeriodSelectionChange={() =>
            setShowWeekStats(!showWeekStats)
          }
          currentStatPeriod={showWeekStats ? 'This Week' : 'Season'}
        />

        {/* Enhanced Stats Grid */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Enhanced Points Display */}
          <div className='from-card/60 to-card/30 border-border/30 rounded-xl border bg-gradient-to-br p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
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
            <div className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              Fantasy Points
            </div>
          </div>

          {/* Enhanced Projection */}
          <div className='from-primary/20 to-primary/5 border-primary/20 rounded-xl border bg-gradient-to-br p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
            <div className='text-primary mb-1 text-3xl font-bold'>
              {currentStats.projection.toFixed(1)}
            </div>
            <div className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              Projected
            </div>
          </div>
        </div>

        {/* Enhanced Detailed Stats */}
        <div className='space-y-3'>
          <div className='text-muted-foreground flex items-center gap-2 text-sm font-semibold'>
            <div className='bg-primary h-2 w-2 rounded-full'></div>
            {showWeekStats ? 'Week Stats' : 'Season Stats'}
          </div>

          <div className='bg-card/20 border-border/30 grid grid-cols-2 gap-3 rounded-lg border p-4 text-sm backdrop-blur-sm'>
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
