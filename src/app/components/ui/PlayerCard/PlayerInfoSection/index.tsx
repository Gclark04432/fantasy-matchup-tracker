'use client';

import { getPositionColor } from '@/app/lib/getPositionColor';
import { Player } from '@/app/types/Player';
import {
  Star,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { PlayerPhoto } from './PlayerPhoto';
import { InjuryStatus } from '@/app/types/InjuryStatus';

interface PlayerInfoSectionProps {
  player: Player;
  darkMode: boolean;
}

const getInjuryStatusIcon = (status?: InjuryStatus) => {
  switch (status) {
    case InjuryStatus.HEALTHY:
      return <CheckCircle2 className='h-4 w-4' />;
    case InjuryStatus.QUESTIONABLE:
      return <HelpCircle className='h-4 w-4' />;
    case InjuryStatus.DOUBTFUL:
      return <AlertCircle className='h-4 w-4' />;
    case InjuryStatus.OUT:
      return <XCircle className='h-4 w-4' />;
    default:
      return <CheckCircle2 className='h-4 w-4' />;
  }
};

const getInjuryStatusStyles = (darkMode: boolean, status?: InjuryStatus) => {
  const baseStyles =
    'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200';

  switch (status) {
    case InjuryStatus.HEALTHY:
      return `${baseStyles} ${
        darkMode
          ? 'bg-green-500/30 text-green-400 border border-green-500/40'
          : 'bg-green-100 text-green-700 border border-green-300'
      }`;
    case InjuryStatus.QUESTIONABLE:
      return `${baseStyles} ${
        darkMode
          ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/40'
          : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
      }`;
    case InjuryStatus.DOUBTFUL:
      return `${baseStyles} ${
        darkMode
          ? 'bg-orange-500/30 text-orange-400 border border-orange-500/40'
          : 'bg-orange-100 text-orange-700 border border-orange-300'
      }`;
    case InjuryStatus.OUT:
      return `${baseStyles} ${
        darkMode
          ? 'bg-red-500/30 text-red-400 border border-red-500/40'
          : 'bg-red-100 text-red-700 border border-red-300'
      }`;
    default:
      return `${baseStyles} ${
        darkMode
          ? 'bg-green-500/30 text-green-400 border border-green-500/40'
          : 'bg-green-100 text-green-700 border border-green-300'
      }`;
  }
};

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

      {/* Enhanced Health Status Badge */}
      <div className='flex flex-col items-end gap-2'>
        <div className={getInjuryStatusStyles(darkMode, player.injuryStatus)}>
          {getInjuryStatusIcon(player.injuryStatus)}
          <span className='capitalize'>{player.injuryStatus || 'Healthy'}</span>
        </div>
      </div>
    </div>
  );
};
