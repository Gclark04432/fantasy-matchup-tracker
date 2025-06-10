import { Player } from '@/app/types/Player';
import { useState, useEffect } from 'react';
import { StatPeriodSelection } from './StatPeriodSelection';
import { ScoreChangeIndicator } from './ScoreChangeIndicator';
import { PlayerInfoSection } from './PlayerInfoSection';
import { StatSection } from './StatsSection';

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
      className={`hover:shadow-3xl group relative cursor-pointer overflow-hidden border border-gray-500/30 bg-gray-500 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
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

      <div className='to-gray-100) absolute inset-0 bg-linear-to-b from-gray-800 opacity-60 transition-opacity duration-500 group-hover:opacity-80' />

      <ScoreChangeIndicator pointsChange={pointsChange} />

      <div className='relative space-y-5 p-6'>
        <PlayerInfoSection player={player} />

        <StatPeriodSelection
          handleStatPeriodSelectionChange={() =>
            setShowWeekStats(!showWeekStats)
          }
          currentStatPeriod={showWeekStats ? 'This Week' : 'Season'}
        />

        <StatSection
          currentStats={currentStats}
          pointsChange={pointsChange}
          isPositive={isPositive}
        />

        {/* Enhanced Detailed Stats */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
            <div className='h-2 w-2 rounded-full bg-sky-500'></div>
            {showWeekStats ? 'Week Stats' : 'Season Stats'}
          </div>

          <div className='grid grid-cols-2 gap-3 rounded-lg border border-gray-800/30 bg-zinc-800/20 p-4 text-sm backdrop-blur-sm'>
            {player.position === 'QB' && (
              <>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Pass Yds</span>
                  <span className='font-medium'>
                    {currentStats.passingYards?.toLocaleString() || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Pass TDs</span>
                  <span className='font-medium'>{currentStats.touchdowns}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>INTs</span>
                  <span className='font-medium'>
                    {currentStats.interceptions || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Rush Yds</span>
                  <span className='font-medium'>
                    {currentStats.rushingYards || 0}
                  </span>
                </div>
              </>
            )}

            {player.position === 'RB' && (
              <>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Rush Yds</span>
                  <span className='font-medium'>
                    {currentStats.rushingYards?.toLocaleString() || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Rush TDs</span>
                  <span className='font-medium'>{currentStats.touchdowns}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Rec Yds</span>
                  <span className='font-medium'>
                    {currentStats.receivingYards || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Receptions</span>
                  <span className='font-medium'>
                    {currentStats.receptions || 0}
                  </span>
                </div>
              </>
            )}

            {(player.position === 'WR' || player.position === 'TE') && (
              <>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Rec Yds</span>
                  <span className='font-medium'>
                    {currentStats.receivingYards?.toLocaleString() || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Receptions</span>
                  <span className='font-medium'>
                    {currentStats.receptions || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Rec TDs</span>
                  <span className='font-medium'>{currentStats.touchdowns}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Targets</span>
                  <span className='font-medium'>
                    {Math.round((currentStats.receptions || 0) * 1.4)}
                  </span>
                </div>
              </>
            )}
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
