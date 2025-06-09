'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/app/types/Player';
import Image from 'next/image';
import {
  BarChart3,
  Calendar,
  Star,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { getPositionColor } from '@/app/lib/getPositionColor';
import { Button } from '../Button';
import { getInjuryStatusColor } from '@/app/lib/getInjuryStatusColor';

interface PlayerCardProps {
  player: Player;
  darkMode: boolean;
}

export function PlayerCard({ player, darkMode }: PlayerCardProps) {
  const [previousPoints, setPreviousPoints] = useState(
    player.seasonStats.points,
  );
  const [pointsChange, setPointsChange] = useState<number | null>(1);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      transition={{ duration: 0.3 }}
      className='transform rounded-2xl transition hover:scale-105 hover:shadow-xl'
    >
      <div
        className={`relative flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        {/* Team Color Accent */}
        <div
          className='absolute top-0 right-0 left-0 h-1 opacity-80'
          style={{ backgroundColor: player.teamColor }}
        />
        {/* Background Gradient */}
        <div className='absolute inset-0 opacity-50' />

        {/* Score Change Indicator */}
        {pointsChange !== null && (
          <div
            className={`animate-fade-in absolute top-4 right-4 z-10 rounded-4xl ${
              pointsChange > 0 ? 'fantasy-success' : 'fantasy-danger'
            }`}
          >
            <div className='fantasy-glass rounded-4xl border-current px-2'>
              {pointsChange > 0 ? '+' : ''}
              {pointsChange.toFixed(1)}
            </div>
          </div>
        )}

        <div className='relative p-6'>
          {/* Header */}
          <div className='mb-4 flex items-start justify-between'>
            <div className='flex items-center gap-4'>
              {/* Player Photo */}
              <div className='relative'>
                <div className='from-primary to-primary/60 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white shadow-lg'>
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
                {/* Projected indicator */}
                {player.isProjectedToScore && (
                  <div className='bg-primary absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full'>
                    <Star className='text-primary-foreground h-3 w-3 fill-current' />
                  </div>
                )}
              </div>

              {/* Player Info */}
              <div>
                <h3 className='text-foreground group-hover:text-primary text-lg font-bold transition-colors'>
                  {player.name}
                </h3>
                <div className='mt-1 flex items-center gap-2'>
                  <div
                    className={`${getPositionColor(player.position)} border font-semibold`}
                  >
                    {player.position}
                  </div>
                  <span className='text-muted-foreground text-sm'>
                    {player.team}
                  </span>
                </div>
              </div>
            </div>

            {/* Injury Status */}
            <div
              className={`text-sm font-medium ${getInjuryStatusColor(player.injuryStatus)}`}
            >
              {player.injuryStatus || 'Healthy'}
            </div>
          </div>

          {/* Stats Toggle */}
          <div className='mb-4 flex gap-2'>
            <Button onClick={() => setShowWeekStats(false)} className='flex-1'>
              <BarChart3 className='mr-1 h-3 w-3' />
              Season
            </Button>
            <Button onClick={() => setShowWeekStats(true)} className='flex-1'>
              <Calendar className='mr-1 h-3 w-3' />
              This Week
            </Button>
          </div>

          {/* Stats Grid */}
          <div className='mb-4 grid grid-cols-2 gap-4'>
            {/* Points */}
            <div className='bg-card/50 border-border/50 rounded-lg border p-3 text-center'>
              <div
                className={`text-foreground flex items-center justify-center gap-1 text-2xl font-bold transition-all duration-300 ${
                  pointsChange !== null ? 'animate-scale-in' : ''
                }`}
              >
                {currentStats.points.toFixed(1)}
                {isPositive ? (
                  <TrendingUp className='fantasy-success h-4 w-4' />
                ) : (
                  <TrendingDown className='fantasy-danger h-4 w-4' />
                )}
              </div>
              <div className='text-muted-foreground text-xs'>
                Fantasy Points
              </div>
            </div>

            {/* Projection */}
            <div className='bg-card/50 border-border/50 rounded-lg border p-3 text-center'>
              <div className='fantasy-info text-2xl font-bold'>
                {currentStats.projection.toFixed(1)}
              </div>
              <div className='text-muted-foreground text-xs'>Projected</div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className='space-y-2'>
            <div className='text-muted-foreground mb-2 text-sm font-medium'>
              {showWeekStats ? 'Week Stats' : 'Season Stats'}
            </div>
            <div className='grid grid-cols-2 gap-3 text-sm'>
              {player.position === 'QB' && (
                <>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Pass Yds</span>
                    <span className='font-medium'>
                      {currentStats.passingYards?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Pass TDs</span>
                    <span className='font-medium'>
                      {currentStats.touchdowns}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>INTs</span>
                    <span className='font-medium'>
                      {currentStats.interceptions || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Rush Yds</span>
                    <span className='font-medium'>
                      {currentStats.rushingYards || 0}
                    </span>
                  </div>
                </>
              )}

              {player.position === 'RB' && (
                <>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Rush Yds</span>
                    <span className='font-medium'>
                      {currentStats.rushingYards?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Rush TDs</span>
                    <span className='font-medium'>
                      {currentStats.touchdowns}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Rec Yds</span>
                    <span className='font-medium'>
                      {currentStats.receivingYards || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Receptions</span>
                    <span className='font-medium'>
                      {currentStats.receptions || 0}
                    </span>
                  </div>
                </>
              )}

              {(player.position === 'WR' || player.position === 'TE') && (
                <>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Rec Yds</span>
                    <span className='font-medium'>
                      {currentStats.receivingYards?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Receptions</span>
                    <span className='font-medium'>
                      {currentStats.receptions || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Rec TDs</span>
                    <span className='font-medium'>
                      {currentStats.touchdowns}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Targets</span>
                    <span className='font-medium'>
                      {Math.round((currentStats.receptions || 0) * 1.4)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
