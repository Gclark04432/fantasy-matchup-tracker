import { InjuryStatus } from './InjuryStatus';
import { PlayerStats } from './PlayerStats';

export interface Player {
  id: number;
  firstname: string;
  surname: string;
  team: string;
  position: string;
  teamColor: string;
  photoUrl?: string;
  seasonStats: PlayerStats;
  weekStats: PlayerStats;
  isProjectedToScore: boolean;
  injuryStatus?: InjuryStatus;
}
