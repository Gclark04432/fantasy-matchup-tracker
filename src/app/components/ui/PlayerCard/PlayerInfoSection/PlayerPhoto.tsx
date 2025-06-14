'use client';

import { Player } from '@/app/types/Player';
import Image from 'next/image';

interface PlayerPhotoProps {
  player: Player;
}

export const PlayerPhoto = ({ player }: PlayerPhotoProps) => {
  return player.photoUrl ? (
    <Image
      src={player.photoUrl}
      alt={`${player.firstname} ${player.surname}`}
      className='h-full w-full rounded-full object-cover'
      width='100'
      height='100'
    />
  ) : (
    `${player.firstname} ${player.surname}`
      .split(' ')
      .map((n) => n[0])
      .join('')
  );
};
