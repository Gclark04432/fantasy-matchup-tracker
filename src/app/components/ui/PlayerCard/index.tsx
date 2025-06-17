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
      className={`group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-500 hover:scale-[1.02] ${
        darkMode
          ? 'border-gray-700 bg-gray-900 text-white shadow-lg shadow-gray-900/50'
          : 'border-gray-200 bg-white text-gray-800 shadow-md shadow-gray-200/50'
      }`}
    >
      {/* Team Color Bar */}
      <div
        className='absolute top-0 right-0 left-0 h-1.5'
        style={{
          backgroundColor: player.teamColor,
          boxShadow: `0 0 15px ${player.teamColor}40`,
        }}
      />

      {/* Subtle Background Gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          darkMode ? 'opacity-20' : 'opacity-10'
        }`}
        style={{
          background: `linear-gradient(150deg, ${player.teamColor}, transparent 80%)`,
        }}
      />

      <ScoreChangeIndicator pointsChange={pointsChange} />

      <div className='relative space-y-4 p-5'>
        <PlayerInfoSection player={player} darkMode={darkMode} />

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
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-sm font-medium'>
            <div
              className={`h-2 w-2 rounded-full ${darkMode ? 'bg-sky-400' : 'bg-sky-600'}`}
            ></div>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
              {showWeekStats ? 'Week Stats' : 'Season Stats'}
            </span>
          </div>

          <div
            className={`grid grid-cols-2 gap-3 rounded-lg border p-3 text-sm ${
              darkMode
                ? 'border-gray-800 bg-gray-800/50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            {player.position === 'QB' && (
              <>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Pass Yds
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.passingYards?.toLocaleString() || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Pass TDs
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.touchdowns}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    INTs
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.interceptions || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Rush Yds
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.rushingYards || 0}
                  </span>
                </div>
              </>
            )}

            {player.position === 'RB' && (
              <>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Rush Yds
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.rushingYards?.toLocaleString() || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Rush TDs
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.touchdowns}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Rec Yds
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.receivingYards || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Receptions
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.receptions || 0}
                  </span>
                </div>
              </>
            )}

            {(player.position === 'WR' || player.position === 'TE') && (
              <>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Rec Yds
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.receivingYards?.toLocaleString() || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Receptions
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.receptions || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Rec TDs
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {currentStats.touchdowns}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-700'}
                  >
                    Targets
                  </span>
                  <span
                    className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                  >
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
        className='absolute right-0 bottom-0 left-0 h-0.5 opacity-40'
        style={{
          background: `linear-gradient(90deg, transparent, ${player.teamColor}, transparent)`,
        }}
      />
    </div>
  );
}
