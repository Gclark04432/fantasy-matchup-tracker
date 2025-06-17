'use client';

import { getInjuryStatusColor } from '@/app/lib/getInjuryStatusColor';
import { getPositionColor } from '@/app/lib/getPositionColor';
import { Player } from '@/app/types/Player';
import { Star } from 'lucide-react';
import { PlayerPhoto } from './PlayerPhoto';

interface PlayerInfoSectionProps {
  player: Player;
  darkMode: boolean;
}

export const PlayerInfoSection = ({
  player,
  darkMode,
}: PlayerInfoSectionProps) => {
  return (
    <div className='flex items-start justify-between'>
      <div className='flex items-center gap-4'>
        {/* Enhanced Player Photo with Glow Effect */}
        <div className='group/avatar relative'>
          <div
            className='flex h-18 w-18 items-center justify-center rounded-full text-xl font-bold text-white shadow-2xl transition-all duration-300 group-hover/avatar:scale-110'
            style={{
              background: `linear-gradient(135deg, ${player.teamColor}, ${player.teamColor})`,
              boxShadow: `0 8px 32px ${player.teamColor}`,
            }}
          >
            <PlayerPhoto player={player} />
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
          <h3 className='text-foreground text-xl leading-tight font-bold transition-all duration-300 group-hover:text-sky-500'>
            {player.firstname}
          </h3>
          <h3 className='text-foreground text-xl leading-tight font-bold transition-all duration-300 group-hover:text-sky-500'>
            {player.surname}
          </h3>
          <div className='flex items-center gap-3'>
            <div
              className={`${getPositionColor(player.position)} border px-3 py-1 font-bold shadow-md`}
            >
              {player.position}
            </div>
            <span
              className={`rounded-md bg-zinc-950/50 px-2 py-1 text-sm font-medium ${
                darkMode ? 'text-gray-500' : 'text-gray-300'
              }`}
            >
              {player.team}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Injury Status */}
      <div
        className={`${getInjuryStatusColor(player.injuryStatus)} absolute inset-0 h-2 px-1 text-sm font-semibold uppercase shadow-sm`}
      >
        {player.injuryStatus || 'Healthy'}
      </div>
    </div>
  );
};
